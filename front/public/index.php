<?php

// The purpose of this file is to dynamically add social network metadata to the index.html file.
// It is not currently possible with the project because it is a Single Page Application (SPA) and does
// not manage Server Side Rendering (SSR).

// If adding social network metadata fails, it should not prevent the website from working.
// Therefore, any error encountered in this file should not prevent the index.html file to
// be returned. This is why we catch all PHP errors/warnings and fall back to default metadata.

// We change the error handler to throw exception to be able to catch warning:
// https://stackoverflow.com/questions/1241728/can-i-try-catch-a-warning
set_error_handler(function ($errno, $errstr, $errfile, $errline) {
    // error was suppressed with the @-operator
    if (0 === error_reporting()) {
        return false;
    }
    throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
});

// Base URL of the website, depending on the environment (prod vs release).
$social_url = 'https://urgent.amnesty.fr';
$graphql_endpoint_url = 'https://rapide.amnesty.fr/graphql';
if (str_starts_with($_SERVER['SERVER_NAME'], 'release.') === true) {
    $social_url = 'https://release.urgent.amnesty.fr';
    $graphql_endpoint_url = 'https://release.rapide.amnesty.fr/graphql';
}

// Canonical URL of the page currently requested (without any query string), so that
// social networks attribute the preview to the shared page and not to the homepage.
$request_path = strtok($_SERVER['REQUEST_URI'], '?');
$canonical_url = $social_url . $request_path;

// Default metadata, used when no urgent action matches or when the GraphQL query fails.
$title = 'Action urgente';
$description = 'Action urgente';
$image_src = null;

try {
    // Build the GraphQL query depending on the requested route:
    // - "/"        -> the default urgent action
    // - "/ua/xxx"  -> the urgent action identified by the slug "xxx"
    $graphql_query = null;

    if ($request_path === '/') {
        $graphql_query = '{"variables":{},"query":"{\n  UrgentAction: DefaultUrgentAction {\n    social_metadata {\n      title\n      description\n      medium {\n        src\n      }\n    }\n  }\n}"}';
    } else if (str_starts_with($request_path, '/ua/') === true) {
        $slug_part = substr($request_path, 4);
        $first_slash_pos = strpos($slug_part, '/');
        $urgent_action_slug = $first_slash_pos !== false ? substr($slug_part, 0, $first_slash_pos) : $slug_part;

        $graphql_query = '{"operationName":"urgentActionBySlug","variables":{"slug":"' . $urgent_action_slug . '"},"query":"query urgentActionBySlug($slug: String!) {\n  UrgentAction: UrgentActionBySlug(slug: $slug) {\n    social_metadata {\n      title\n      description\n      medium {\n        src\n      }\n    }\n  }\n}"}';
    }

    if ($graphql_query !== null) {
        $options = array(
            'http' => array(
                'method'  => 'POST',
                'content' => $graphql_query,
                'header'  => "Content-Type: application/json\r\n" .
                             "Accept: application/json\r\n",
                'timeout' => 5,
            )
        );

        $context = stream_context_create($options);
        $result = file_get_contents($graphql_endpoint_url, false, $context);
        $response = json_decode($result);
        $social_metadata = $response->data->UrgentAction->social_metadata ?? null;

        if ($social_metadata !== null) {
            if (!empty($social_metadata->title)) {
                $title = $social_metadata->title;
            }
            if (!empty($social_metadata->description)) {
                $description = $social_metadata->description;
            }
            if (!empty($social_metadata->medium->src)) {
                $image_src = $social_metadata->medium->src;
            }
        }
    }
} catch (Exception $e) {
    // Something went wrong. Silently ignore and keep the default metadata values.
}

// Build the metadata tags to inject in the <head>.
$title = htmlspecialchars($title);
$description = htmlspecialchars($description);
$canonical_url = htmlspecialchars($canonical_url);

$metadata_tags = '';
$metadata_tags .= '<title>' . $title . '</title>';
$metadata_tags .= '<meta name="description" content="' . $description . '" />';
$metadata_tags .= '<meta property="og:title" content="' . $title . '" />';
$metadata_tags .= '<meta property="og:description" content="' . $description . '" />';
$metadata_tags .= '<meta property="og:type" content="website" />';
$metadata_tags .= '<meta property="og:url" content="' . $canonical_url . '" />';
$metadata_tags .= '<meta property="og:site_name" content="Amnesty International - Actions urgentes" />';
$metadata_tags .= '<meta name="twitter:title" content="' . $title . '" />';
$metadata_tags .= '<meta name="twitter:description" content="' . $description . '" />';
$metadata_tags .= '<meta name="twitter:url" content="' . $canonical_url . '" />';

if ($image_src !== null) {
    $image_src = htmlspecialchars($image_src);
    $metadata_tags .= '<meta property="og:image" content="' . $image_src . '" />';
    $metadata_tags .= '<meta property="og:image:secure_url" content="' . $image_src . '" />';
    $metadata_tags .= '<meta property="og:image:alt" content="' . $title . '" />';
    $metadata_tags .= '<meta name="twitter:card" content="summary_large_image" />';
    $metadata_tags .= '<meta name="twitter:image" content="' . $image_src . '" />';
    $metadata_tags .= '<meta name="twitter:image:alt" content="' . $title . '" />';
} else {
    // No image available: fall back to a small summary card on Twitter.
    $metadata_tags .= '<meta name="twitter:card" content="summary" />';
}

// Read the index.html file and inject the metadata tags right before </head>.
$file = file_get_contents(__DIR__ . '/index.html');
$file = str_ireplace('</head>', $metadata_tags . '</head>', $file);

echo $file;

?>
