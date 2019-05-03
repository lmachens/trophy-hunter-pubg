import React from 'react';
import { NextFunctionComponent } from 'next';
import { makeStyles } from '@material-ui/styles';
import { Typography, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: theme.spacing(2)
  }
}));

const AboutPage: NextFunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h4">Legal Notice</Typography>
      <Typography>Information in accordance with Section 5 TMG</Typography>
      <Typography paragraph>
        Leon Machens
        <br />
        Bismarckstr. 38
        <br />
        50672 Cologne
        <br />
        Germany
      </Typography>
      <Typography variant="h5">Contact</Typography>
      <Typography paragraph>
        Tel.: +49 176 6477 7468
        <br />
        E-Mail: leon.machens@gmail.com
      </Typography>
      <Typography variant="h4">Disclaimer</Typography>
      <Typography variant="h5">Liability for content</Typography>
      <Typography paragraph>
        The content of this site has been created with the greatest of care. I cannot, however,
        guarantee that the information in it is accurate, complete or up-to-date. As a service
        provider I am responsible under Section 6(1) of the German Media Services Inter-State
        Agreement and Section 8(1) of the German Teleservices Act for my own content on this site.
        Service providers are not however obliged to monitor third party information transmitted or
        stored on their site by them or to look for circumstances which may suggest a violation of
        the law. This does not affect my statutory obligations to remove or block the use of
        information. My liability in such cases shall however commence from the time I become aware
        of an actual violation. On becoming aware of such violations I shall remove this content
        immediately.
      </Typography>
      <Typography variant="h5">Liability for links</Typography>
      <Typography paragraph>
        This website contains links to external third-party websites, over the content of which I
        have no control. I cannot, therefore, make any guarantees regarding this third-party
        content. Responsibility for the content of linked sites lies solely with the provider or
        operator of the site concerned. All linked sites were checked for possible violations of the
        law when they were linked to mine. At that time I was not aware of any content which may
        violate the law. However, I cannot be expected to monitor the content of linked sites on an
        ongoing basis unless I have reason to suspect a violation of the law. On becoming aware of
        such a violation I shall remove the respective link immediately.
      </Typography>
      <Typography variant="h5">Copyright</Typography>
      <Typography paragraph>
        PUBG, PLAYERUNKNOWN’S BATTLEGROUNDS and all related logos are trademarks of PUBG Corporation
        or its affiliates. I make every effort to respect the copyrights of outside parties and to
        employ my own material and material in the public domain. All content and material on this
        site created by me is governed by German copyright law. Downloads and copies of this site
        may be made for private, non-commercial use only. Reproduction, processing, distribution and
        any form of exploitation beyond that permitted by copyright law requires the written consent
        of the author or creator concerned. Contributions by third parties are identified as such.
        Should anyone become aware of a possible copyright infringement, I kindly request that you
        inform me of such. Upon becoming aware of such a violation I shall remove the respective
        content immediately.
      </Typography>
      <Typography variant="h4">Privacy Policy</Typography>
      <Typography paragraph>
        Personal data (usually referred to just as &quot;data&quot; below) will only be processed by
        us to the extent necessary and for the purpose of providing a functional and user-friendly
        website, including its contents, and the services offered there.
        <br />
        Per Art. 4 No. 1 of Regulation (EU) 2016/679, i.e. the General Data Protection Regulation
        (hereinafter referred to as the &quot;GDPR&quot;), &quot;processing&quot; refers to any
        operation or set of operations such as collection, recording, organization, structuring,
        storage, adaptation, alteration, retrieval, consultation, use, disclosure by transmission,
        dissemination, or otherwise making available, alignment, or combination, restriction,
        erasure, or destruction performed on personal data, whether by automated means or not.
        <br />
        The following privacy policy is intended to inform you in particular about the type, scope,
        purpose, duration, and legal basis for the processing of such data either under my own
        control or in conjunction with others. We also inform you below about the third-party
        components we use to optimize our website and improve the user experience which may result
        in said third parties also processing data they collect and control.
        <br />
        Our privacy policy is structured as follows:
        <br />
        I. Information about us as controllers of your data II. The rights of users and data
        subjects III. Information about the data processing
      </Typography>
      <Typography variant="h4">I. Information about us as controllers of your data</Typography>
      <Typography paragraph>
        The party responsible for this website (the &quot;controller&quot;) for purposes of data
        protection law is:
        <br />
        <br />
      </Typography>
      <Typography paragraph>
        Leon Machens
        <br />
        Bismarckstr. 38
        <br />
        50672 Cologne
        <br />
        Germany
      </Typography>
      <Typography variant="h5">Contact</Typography>
      <Typography paragraph>
        Tel.: +49 176 6477 7468
        <br />
        E-Mail: leon.machens@gmail.com
      </Typography>
      <Typography variant="h4">II. The rights of users and data subjects</Typography>
      <Typography paragraph component="div">
        With regard to the data processing to be described in more detail below, users and data
        subjects have the right
        <ul>
          <li>
            to confirmation of whether data concerning them is being processed, information about
            the data being processed, further information about the nature of the data processing,
            and copies of the data (cf. also Art. 15 GDPR);
          </li>
          <li>to correct or complete incorrect or incomplete data (cf. also Art. 16 GDPR);</li>
          <li>
            to the immediate deletion of data concerning them (cf. also Art. 17 DSGVO), or,
            alternatively, if further processing is necessary as stipulated in Art. 17 Para. 3 GDPR,
            to restrict said processing per Art. 18 GDPR;
          </li>
          <li>
            to receive copies of the data concerning them and/or provided by them and to have the
            same transmitted to other providers/controllers (cf. also Art. 20 GDPR);
          </li>
          <li>
            to file complaints with the supervisory authority if they believe that data concerning
            them is being processed by the controller in breach of data protection provisions (see
            also Art. 77 GDPR).
          </li>
        </ul>
        In addition, the controller is obliged to inform all recipients to whom it discloses data of
        any such corrections, deletions, or restrictions placed on processing the same per Art. 16,
        17 Para. 1, 18 GDPR. However, this obligation does not apply if such notification is
        impossible or involves a disproportionate effort. Nevertheless, users have a right to
        information about these recipients. Likewise, under Art. 21 GDPR, users and data subjects
        have the right to object to the controller&apos;s future processing of their data pursuant
        to Art. 6 Para. 1 lit. f) GDPR. In particular, an objection to data processing for the
        purpose of direct advertising is permissible.
      </Typography>
      <Typography variant="h4">III. Information about the data processing</Typography>
      <Typography paragraph>
        Your data processed when using our website will be deleted or blocked as soon as the purpose
        for its storage ceases to apply, provided the deletion of the same is not in breach of any
        statutory storage obligations or unless otherwise stipulated below.
      </Typography>
      <Typography variant="h5">Cookies</Typography>
      <Typography paragraph>
        a) Session cookies
        <br />
        We use cookies on our website. Cookies are small text files or other storage technologies
        stored on your computer by your browser. These cookies process certain specific information
        about you, such as your browser, location data, or IP address.
        <br />
        This processing makes our website more user-friendly, efficient, and secure, allowing us,
        for example, to display our website in different languages or to offer a shopping cart
        function.
        <br />
        The legal basis for such processing is Art. 6 Para. 1 lit. b) GDPR, insofar as these cookies
        are used to collect data to initiate or process contractual relationships.
        <br />
        If the processing does not serve to initiate or process a contract, our legitimate interest
        lies in improving the functionality of our website. The legal basis is then Art. 6 Para. 1
        lit. f) GDPR.
        <br />
        When you close your browser, these session cookies are deleted.
        <br />
        b) Third-party cookies
        <br />
        If necessary, our website may also use cookies from companies with whom we cooperate for the
        purpose of advertising, analyzing, or improving the features of our website.
        <br />
        Please refer to the following information for details, in particular for the legal basis and
        purpose of such third-party collection and processing of data collected through cookies.
        <br />
        c) Disabling cookies
        <br />
        You can refuse the use of cookies by changing the settings on your browser. Likewise, you
        can use the browser to delete cookies that have already been stored. However, the steps and
        measures required vary, depending on the browser you use. If you have any questions, please
        use the help function or consult the documentation for your browser or contact its maker for
        support. Browser settings cannot prevent so-called flash cookies from being set. Instead,
        you will need to change the setting of your Flash player. The steps and measures required
        for this also depend on the Flash player you are using. If you have any questions, please
        use the help function or consult the documentation for your Flash player or contact its
        maker for support.
        <br />
        If you prevent or restrict the installation of cookies, not all of the functions on our site
        may be fully usable.
      </Typography>
      <Typography variant="h5">Matomo (formerly: PIWIK)</Typography>
      <Typography paragraph>
        Our website uses Matomo (formerly: PIWIK). This is open-source software with which we can
        analyze the use of our site. Data such as your IP address, the pages you visit, the website
        from which you came (referrer URL), the duration of your visit, and the frequency of your
        visits is processed.
        <br />
        Matomo stores a cookie on your device via your browser in order to collect this data. This
        cookie is valid for one week.
        <br />
        The legal basis is Art. 6 Para. 1 lit. f) GDPR. Our legitimate interest lies in the analysis
        and optimization of our website.
        <br />
        We use Matomo with the &quot;Automatically Anonymize Visitor IPs&quot; function. This
        anonymization function truncates your IP address by two bytes so that it is impossible to
        assign it to you or to the internet connection you are using.
        <br />
        If you do not agree to this processing, you have the option of preventing the installation
        of cookies by making the appropriate settings in your browser. Further details can be found
        in the section about cookies above.
        <br />
        In addition, you have the option of terminating the analysis of your usage behavior by
        opting out. By confirming the link
        <iframe
          style={{ display: 'block', border: 0, height: 200, width: 600 }}
          src="https://matomo.machens.cloud/index.php?module=CoreAdminHome&action=optOut&language=de&backgroundColor=&fontColor=ffffff&fontSize=1rem&fontFamily=%22Roboto%22%2C%20%22Helvetica%22%2C%20%22Arial%22%2C%20sans-serif&language=en"
        />
        a cookie is stored on your device via your browser to prevent any further analysis. Please
        note, however, that you must click the above link again if you delete the cookies stored on
        your end device.
      </Typography>
    </div>
  );
};

export default AboutPage;
