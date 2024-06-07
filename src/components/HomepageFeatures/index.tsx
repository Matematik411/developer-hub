import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
  linkToProtocolDocs: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: "FTSO",
    Svg: require("@site/static/img/FTSO.svg").default,
    description: (
      <>
        High-integrity & block-latency data feeds for DeFi on Flare
      </>
    ),
    linkToProtocolDocs: "docs/ftso/overview",
  },
  {
    title: "FDC",
    Svg: require("@site/static/img/DATACONNECTOR.svg").default,
    description: (
      <>
        Interoperable, tamper-proof Web2 & Web3 data for RWAs on Flare
      </>
    ),
    linkToProtocolDocs: "docs/fdc/overview",
  },
  {
    title: "FAssets",
    Svg: require("@site/static/img/FASSETS.svg").default,
    description: (
      <>Verifiable economic security for bridging BTC, XRP, DOGE and non-SC tokens</>
    ),
    linkToProtocolDocs: "docs/fassets/intro",
  },
];

function FeatureCard({
  title,
  Svg,
  description,
  linkToProtocolDocs,
}: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="card margin-left--sm margin-right--sm margin-bottom--lg">
        <div className="card__header text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="card__body text--center">
          <Heading as="h2">{title}</Heading>
          <p>{description}</p>
        </div>
        <div className="card__footer text--center">
          <Link
            className="button button--outline button--primary button--md"
            to={linkToProtocolDocs}
          >
            Protocol Docs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <FeatureCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
