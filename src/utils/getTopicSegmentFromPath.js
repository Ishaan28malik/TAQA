// utils.js
// import { useParams } from "next/navigation";

export const getTopicSegmentFromPath = (path) => {
  // const {helpTopic} = useParams();
  // return pathSegments[helpTopic || ''];
  const pathSegments = path.split("/");
  // make this 1 for dev and for prod it should be 1
  return pathSegments[pathSegments.length - 1];
};
