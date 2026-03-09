import dynamic from "next/dynamic";

const NearbyMapClient = dynamic(() => import("./NearbyMapClient"), { ssr: false });

export default function NearbyMap(props) {
  return <NearbyMapClient {...props} />;
}
