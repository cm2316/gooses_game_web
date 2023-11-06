import '../privacy-policy/index.scss';

export default function Index() {
  return (
    <div className="container privacy-container">
      <div className="relative">
        <div className="pp-header">
          <h2 className="pt-0">Cookie Policy of www.game520.online</h2>

          <p>
            This document informs Users about the technologies that help this Application to achieve
            the purposes described below. Such technologies allow the Owner to access and store
            information (for example by using a Cookie) or use resources (for example by running a
            script) on a User’s device as they interact with this Application.
          </p>
          <p>
            For simplicity, all such technologies are defined as "Trackers" within this document –
            unless there is a reason to differentiate.
            <br />
            For example, while Cookies can be used on both web and mobile browsers, it would be
            inaccurate to talk about Cookies in the context of mobile apps as they are a
            browser-based Tracker. For this reason, within this document, the term Cookies is only
            used where it is specifically meant to indicate that particular type of Tracker.
          </p>

          <p>
            Some of the purposes for which Trackers are used may also require the User's consent.
            Whenever consent is given, it can be freely withdrawn at any time following the
            instructions provided in this document.
          </p>

          <p>
            This Application uses Trackers managed directly by the Owner (so-called “first-party”
            Trackers) and Trackers that enable services provided by a third-party (so-called
            “third-party” Trackers). Unless otherwise specified within this document, third-party
            providers may access the Trackers managed by them.
            <br />
            The validity and expiration periods of Cookies and other similar Trackers may vary
            depending on the lifetime set by the Owner or the relevant provider. Some of them expire
            upon termination of the User’s browsing session.
            <br />
            In addition to what’s specified in the descriptions within each of the categories below,
            Users may find more precise and updated information regarding lifetime specification as
            well as any other relevant information — such as the presence of other Trackers — in the
            linked privacy policies of the respective third-party providers or by contacting the
            Owner.
          </p>

          <h3>
            Activities strictly necessary for the operation of this Application and delivery of the
            Service
          </h3>

          <p>
            This Application uses so-called “technical” Cookies and other similar Trackers to carry
            out activities that are strictly necessary for the operation or delivery of the Service.
          </p>

          <h4>Third-party Trackers</h4>

          <ul className="mt-5 p-2 rounded mb- shadow-sm border border-gray-400">
            <li>
              <div>
                <h3>Spam and bots protection</h3>
                <div className="mt-2">
                  <p>
                    This type of service analyzes the traffic of this Application, potentially
                    containing Users' Personal Data, with the purpose of filtering it from unwanted
                    parts of traffic, messages and content that are recognized as spam or protecting
                    it from malicious bots activities.
                  </p>
                  <h4>Google reCAPTCHA (Google LLC)</h4>
                  <div className="wrap">
                    <p>
                      Google reCAPTCHA is a SPAM protection service provided by Google LLC.
                      <br />
                      The use of reCAPTCHA is subject to the Google
                      <a
                        href="https://www.google.com/policies/privacy/"
                        target="_blank"
                        rel="noopener"
                      >
                        privacy policy
                      </a>
                      and
                      <a
                        href="https://www.google.com/intl/en/policies/terms/"
                        target="_blank"
                        rel="noopener"
                      >
                        terms of use
                      </a>
                      .
                    </p>
                  </div>
                  <p>
                    Personal Data processed: answers to questions, clicks, keypress events, motion
                    sensor events, mouse movements, scroll position, touch events, Trackers and
                    Usage Data.
                  </p>
                  <p>
                    Place of processing: United States –
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                  <p> Storage duration: </p>
                  <ul>
                    <li>_GRECAPTCHA: duration of the session</li> <li>rc::a: indefinite</li>
                    <li>rc::b: duration of the session</li> <li>rc::c: duration of the session</li>
                  </ul>
                  <p></p>
                </div>
              </div>
            </li>
          </ul>

          <h3>Other activities involving the use of Trackers</h3>

          <h4>Measurement</h4>
          <p>
            This Application uses Trackers to measure traffic and analyze User behavior to improve
            the Service.
          </p>

          <ul className="mt-5 p-2 rounded mb- shadow-sm border border-gray-400">
            <li>
              <div>
                <h3>Analytics</h3>
                <div className="mt-2">
                  <p>
                    The services contained in this section enable the Owner to monitor and analyze
                    web traffic and can be used to keep track of User behavior.
                  </p>
                  <h4>Google Analytics (Universal Analytics) (Google LLC)</h4>
                  <div className="wrap">
                    <p>
                      Google Analytics (Universal Analytics) is a web analysis service provided by
                      Google LLC (“Google”). Google utilizes the Data collected to track and examine
                      the use of this Application, to prepare reports on its activities and share
                      them with other Google services.
                      <br />
                      Google may use the Data collected to contextualize and personalize the ads of
                      its own advertising network.
                    </p>
                  </div>
                  <p>Personal Data processed: Trackers and Usage Data.</p>
                  <p>
                    Place of processing: United States –
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>
                    –
                    <a href="https://tools.google.com/dlpage/gaoptout?hl=en" target="_blank">
                      Opt Out
                    </a>
                    .
                  </p>
                  <p> Storage duration: </p>
                  <ul>
                    <li>AMP_TOKEN: 1 hour</li> <li>_ga: 2 years</li> <li>_gac*: 3 months</li>
                    <li>_gat: 1 minute</li> <li>_gid: 1 day</li>
                  </ul>
                  <p></p>
                </div>
              </div>
            </li>
          </ul>

          <h3>How to manage preferences and provide or withdraw consent</h3>

          <p>
            There are various ways to manage Tracker related preferences and to provide and withdraw
            consent, where relevant:
          </p>
          <p>
            Users can manage preferences related to Trackers from directly within their own device
            settings, for example, by preventing the use or storage of Trackers.
          </p>
          <p>
            Additionally, whenever the use of Trackers is based on consent, Users can provide or
            withdraw such consent by setting their preferences within the cookie notice or by
            updating such preferences accordingly via the relevant consent-preferences privacy
            widget, if available.
          </p>
          <p>
            It is also possible, via relevant browser or device features, to delete previously
            stored Trackers, including those used to remember the User’s initial consent
            preferences.
          </p>
          <p>
            Other Trackers in the browser’s local memory may be cleared by deleting the browsing
            history.
          </p>

          <p>
            With regard to any third-party Trackers, Users can manage their preferences via the
            related opt-out link (where provided), by using the means indicated in the third party's
            privacy policy, or by contacting the third party.
          </p>

          <h4>Locating Tracker Settings</h4>
          <p>
            Users can, for example, find information about how to manage Cookies in the most
            commonly used browsers at the following addresses:
          </p>
          <ul>
            <li>
              <a
                rel="noopener nofollow"
                target="_blank"
                href="https://support.google.com/chrome/answer/95647?hl=en&amp;p=cpn_cookies"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                rel="noopener nofollow"
                target="_blank"
                href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                rel="noopener nofollow"
                target="_blank"
                href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/"
              >
                Apple Safari
              </a>
            </li>
            <li>
              <a
                rel="noopener nofollow"
                target="_blank"
                href="http://windows.microsoft.com/en-us/windows-vista/block-or-allow-cookies"
              >
                Microsoft Internet Explorer
              </a>
            </li>
            <li>
              <a
                rel="noopener nofollow"
                target="_blank"
                href="https://support.microsoft.com/en-us/help/4027947"
              >
                Microsoft Edge
              </a>
            </li>
            <li>
              <a
                rel="noopener nofollow"
                target="_blank"
                href="https://support.brave.com/hc/en-us/articles/360022806212-How-do-I-use-Shields-while-browsing"
              >
                Brave
              </a>
            </li>
            <li>
              <a
                rel="noopener nofollow"
                target="_blank"
                href="https://help.opera.com/en/latest/web-preferences/#cookies"
              >
                Opera
              </a>
            </li>
          </ul>
          <p>
            Users may also manage certain categories of Trackers used on mobile apps by opting out
            through relevant device settings such as the device advertising settings for mobile
            devices, or tracking settings in general (Users may open the device settings and look
            for the relevant setting).
          </p>

          <h4>Consequences of denying the use of Trackers</h4>
          <p>
            Users are free to decide whether or not to allow the use of Trackers. However, please
            note that Trackers help this Application to provide a better experience and advanced
            functionalities to Users (in line with the purposes outlined in this document).
            Therefore, if the User chooses to block the use of Trackers, the Owner may be unable to
            provide related features.
          </p>

          <h3>Owner and Data Controller</h3>
          <p>Gooes Fun</p>
          <p>
            <strong>Owner contact email:</strong> gooses_wechat_mini@163.com
          </p>

          <p>
            Since the use of third-party Trackers through this Application cannot be fully
            controlled by the Owner, any specific references to third-party Trackers are to be
            considered indicative. In order to obtain complete information, Users are kindly
            requested to consult the privacy policies of the respective third-party services listed
            in this document.
          </p>
          <p>
            Given the objective complexity surrounding tracking technologies, Users are encouraged
            to contact the Owner should they wish to receive any further information on the use of
            such technologies by this Application.
          </p>
        </div>

        <div className="pp-header">
          <div>
            <h3>Definitions and legal references</h3>
            <div className="mt-2">
              <h4>Personal Data (or Data)</h4>
              <p>
                Any information that directly, indirectly, or in connection with other information —
                including a personal identification number — allows for the identification or
                identifiability of a natural person.
              </p>

              <h4>Usage Data</h4>
              <p>
                Information collected automatically through this Application (or third-party
                services employed in this Application), which can include: the IP addresses or
                domain names of the computers utilized by the Users who use this Application, the
                URI addresses (Uniform Resource Identifier), the time of the request, the method
                utilized to submit the request to the server, the size of the file received in
                response, the numerical code indicating the status of the server's answer
                (successful outcome, error, etc.), the country of origin, the features of the
                browser and the operating system utilized by the User, the various time details per
                visit (e.g., the time spent on each page within the Application) and the details
                about the path followed within the Application with special reference to the
                sequence of pages visited, and other parameters about the device operating system
                and/or the User's IT environment.
              </p>

              <h4>User</h4>
              <p>
                The individual using this Application who, unless otherwise specified, coincides
                with the Data Subject.
              </p>

              <h4>Data Subject</h4>
              <p>The natural person to whom the Personal Data refers.</p>

              <h4>Data Processor (or Processor)</h4>
              <p>
                The natural or legal person, public authority, agency or other body which processes
                Personal Data on behalf of the Controller, as described in this privacy policy.
              </p>

              <h4>Data Controller (or Owner)</h4>
              <p>
                The natural or legal person, public authority, agency or other body which, alone or
                jointly with others, determines the purposes and means of the processing of Personal
                Data, including the security measures concerning the operation and use of this
                Application. The Data Controller, unless otherwise specified, is the Owner of this
                Application.
              </p>

              <h4>This Application</h4>
              <p>The means by which the Personal Data of the User is collected and processed.</p>

              <h4>Service</h4>
              <p>
                The service provided by this Application as described in the relative terms (if
                available) and on this site/application.
              </p>

              <h4>European Union (or EU)</h4>
              <p>
                Unless otherwise specified, all references made within this document to the European
                Union include all current member states to the European Union and the European
                Economic Area.
              </p>

              <h4>Cookie</h4>
              <p>
                Cookies are Trackers consisting of small sets of data stored in the User's browser.
              </p>

              <h4>Tracker</h4>
              <p>
                Tracker indicates any technology - e.g Cookies, unique identifiers, web beacons,
                embedded scripts, e-tags and fingerprinting - that enables the tracking of Users,
                for example by accessing or storing information on the User’s device.
              </p>

              <hr />

              <h4>Legal information</h4>

              <p>
                This privacy policy relates solely to this Application, if not stated otherwise
                within this document.
              </p>
            </div>
          </div>
        </div>

        <div className="pp-footer">
          <p>Latest update: November 06, 2023</p>
        </div>
      </div>
    </div>
  );
}
