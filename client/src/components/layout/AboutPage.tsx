import styles from './AboutPage.module.scss';

export function AboutPage() {  
    return (
      <div>
        <h1>About Us</h1>
        <p className={styles.text}>
            Founded in 2021 by data scientists, engineers, and industry experts,<br />
            Harmonya is on a mission to unleash the power of product data along the entire commerce value chain.<br />
            Harmonya is a venture backed technology company that is based in New York City and Tel Aviv.
        </p>
      </div>
    );
  }