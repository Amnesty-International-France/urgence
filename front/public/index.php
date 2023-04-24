<?php

// The purpose of this file is to dynamically add social network metadata to the index.html file.
// It is not currently possible with the project because it is a Single Page Application (SPA) and does
// not manager Server Side Rendering (SSR).

// If adding social network metadata fails, it should not prevent the website from working.
// Therefore, any error encountered in this file should not prevent the index.html file to
// be returned.
// This is why we need to catch all PPH errors and warning, raising an exception for each
// and in this case simply go on returning an unmodified index.html without any social metadata.

// We change the error handler to throw exception to be able to catch warning:
// https://stackoverflow.com/questions/1241728/can-i-try-catch-a-warning
set_error_handler(function($errno, $errstr, $errfile, $errline) {
    // error was suppressed with the @-operator
    if (0 === error_reporting()) {
        return false;
    }

    throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
});

// Read the index.html file. We will then try to insert social networks metadata meta tags
// in the <head> before returning the file's content.
$file = file_get_contents("index.html");

// This is the graphql endpoint that we will query to fetch urgent action metadatas.
// By default, use production URL
$graphql_endpoint_url = 'https://rapide.amnesty.fr/graphql';
if (str_starts_with($_SERVER['SERVER_NAME'], "release.") === true) {
    // If on release, use release API
    $graphql_endpoint_url = 'https://release.rapide.amnesty.fr/graphql';
}

try {

    $social_metadata = NULL;

    if ($_SERVER['REQUEST_URI'] === "/") {
        // Requested URL is / so we lookup social network metadatas for the default urgent action

        $graphql_query = '{"variables":{},"query":"{\n  UrgentAction: DefaultUrgentAction {\n    id\n    title\n    slug\n    social_metadata {\n      title\n      description\n      medium {\n        src\n        title\n      }\n    }\n  }\n}"}';

        $options = array(
            'http' => array(
                'method'  => 'POST',
                'content' => $graphql_query,
                'header'=>  "Content-Type: application/json\r\n" .
                            "Accept: application/json\r\n"
                )
        );

        $context  = stream_context_create( $options );
        $result = file_get_contents( $graphql_endpoint_url, false, $context );
        $response = json_decode( $result );
        $social_metadata = $response->data->UrgentAction->social_metadata;

    } else if (str_starts_with($_SERVER['REQUEST_URI'], "/ua/") === true) {
        // A specific urgent action is requested. We extract the slug from the URI.

        $request_uri_without_prefix = substr($_SERVER['REQUEST_URI'], 4);

        $urgent_action_slug = $request_uri_without_prefix;
        $first_slash_pos = strpos($request_uri_without_prefix, "/");
        if ($first_slash_pos !== false) {
            $urgent_action_slug = substr($request_uri_without_prefix, 0, $first_slash_pos);
        }

        // And then we request the social network metadata for this specific urgent action
        $graphql_query = '{"operationName":"urgentActionBySlug","variables":{"slug":"' . $urgent_action_slug . '"},"query":"query urgentActionBySlug($slug: String!) {\n  UrgentAction: UrgentActionBySlug(slug: $slug) {\n    social_metadata {\n      title\n      description\n      medium {\n        src\n        title\n      }\n    }\n  }\n}"}';

        $options = array(
            'http' => array(
                'method'  => 'POST',
                'content' => $graphql_query,
                'header'=>  "Content-Type: application/json\r\n" .
                            "Accept: application/json\r\n"
                )
        );

        $context  = stream_context_create( $options );
        $result = file_get_contents( $graphql_endpoint_url, false, $context );
        $response = json_decode( $result );
        $social_metadata = $response->data->UrgentAction->social_metadata;
    }

    $metadata_tags = '';

    $title = 'Action urgente';
    if (!empty($response->data->UrgentAction->social_metadata->title)) {
        $title = htmlspecialchars($response->data->UrgentAction->social_metadata->title);
    }
    $description = 'Action urgente';
    if (!empty($response->data->UrgentAction->social_metadata->description)) {
        $description = htmlspecialchars($response->data->UrgentAction->social_metadata->description);
    }

    $metadata_tags .= '<title>' . $title . '</title>';
    $metadata_tags .= '<meta name="description" content="' . $description . '" />';
    $metadata_tags .= '<meta property="og:title" content="' . $title . '" />';
    $metadata_tags .= '<meta property="og:description" content="' . $description . '" />';
    $metadata_tags .= '<meta property="og:type" content="website" />';

    $social_url = 'https://urgent.amnesty.fr';
    if (str_starts_with($_SERVER['SERVER_NAME'], "release.") === true) {
        $social_url = 'https://release.urgent.amnesty.fr';
    }
    $metadata_tags .= '<meta property="og:url" content="' . $social_url . '" />';
    $metadata_tags .= '<meta property="og:site_name" content="' . $title . '" />';
    $metadata_tags .= '<meta name="twitter:card" content="summary" />';
    $metadata_tags .= '<meta name="twitter:title" content="' . $title . '" />';
    $metadata_tags .= '<meta name="twitter:description" content="' . $description . '" />';
    $metadata_tags .= '<meta name="twitter:url" content="' . $social_url . '" />';

    if (!empty($response->data->UrgentAction->social_metadata->medium->src)) {
        $medium_src = htmlspecialchars($response->data->UrgentAction->social_metadata->medium->src);
        $metadata_tags .= '<meta name="twitter:image" content="' . $medium_src . '" />';
        $metadata_tags .= '<meta property="og:image" content="' . $medium_src . '" />';
    }

    $file = str_ireplace("</head>", $metadata_tags . "</head>", $file);

} catch (Exception $e) {
    // Something went wrong. Silently ignore errors.

    // If we somehow failed to set metadata based on graphql queries, we set default values for metadatas
    $metadata_tags = '';

    $title = 'Action urgente';
    $description = 'Action urgente';

    $metadata_tags .= '<title>' . $title . '</title>';
    $metadata_tags .= '<meta name="description" content="' . $description . '" />';
    $metadata_tags .= '<meta property="og:title" content="' . $title . '" />';
    $metadata_tags .= '<meta property="og:description" content="' . $description . '" />';
    $metadata_tags .= '<meta property="og:type" content="website" />';

    $social_url = 'https://urgent.amnesty.fr';
    if (str_starts_with($_SERVER['SERVER_NAME'], "release.") === true) {
        $social_url = 'https://release.urgent.amnesty.fr';
    }
    $metadata_tags .= '<meta property="og:url" content="' . $social_url . '" />';
    $metadata_tags .= '<meta property="og:site_name" content="' . $title . '" />';
    $metadata_tags .= '<meta name="twitter:card" content="summary" />';
    $metadata_tags .= '<meta name="twitter:title" content="' . $title . '" />';
    $metadata_tags .= '<meta name="twitter:description" content="' . $description . '" />';
    $metadata_tags .= '<meta name="twitter:url" content="' . $social_url . '" />';

    $file = str_ireplace("</head>", $metadata_tags . "</head>", $file);
}

// Serve index.html file
echo $file;

?>
