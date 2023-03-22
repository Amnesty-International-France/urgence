import get from "lodash.get";

import TransitionScreen from "@/components/theme-front/TransitionScreen";

type OwnProps = {
  actions?: (...args: any[]) => any;
  data?: {
    title: string;
    message: string;
  };
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof Act.defaultProps;

// @ts-expect-error TS(7022): 'Act' implicitly has type 'any' because it does no... Remove this comment to see the full error message
const Act = ({ data, actions }: Props) => {
    // console.log('data', data);
    // console.log('actions', actions);
    // return <h1>Act</h1>;
  return (
    <TransitionScreen // @ts-ignore guillaumep
      className="act"
      actions={actions}
      title={get(data, "title")}
      message={get(data, "message")}
      progress={get(data, "progress")}
      responseCount={get(data, "response_count")}
      interpelationMode={get(data, "interpelation_mode")}
      twitterAction={get(data, "twitter_action")}
      auId={get(data, "auId")}
    />
  );
};

Act.defaultProps = {
  actions: () => {},
};

export default Act;
