# Introduction
INFECT – an __IN__terface __F__or __E__mpirical antimicrobial __C__hemo**T**herapy – provides intuitive access to the latest data regarding microbes, antibiotic susceptibility and antibiotic treatment recommendations. INFECT aims to innovate patient care, reduce antimicrobial resistance, and save lives.


# Feedback
Feedback is very welcome. Please write to [info@infect.info](mailto:info@infect.info) for issues regarding INFECT.


# INFECT Mobile App
# ***TBD***
INFECT VET is available as an app for your smartphone and tablet: 
[![Apple Store][app-store-icon]](https://itunes.apple.com/us/app/infect/id1422829703?ls=1&mt=8)
[![Google Play Store][google-play-icon]](https://play.google.com/store/apps/details?id=info.infect.app)

[app-store-icon]: /tenant/infect-anresis/about/app-store-icon.png "Apple Store"
[google-play-icon]: /tenant/infect-anresis/about/google-play-icon.png "Google Play Store"


# Using INFECT


## Guided Tour
Interactive INFECT tour: [Start Guided Tour](#tourGuideButton)


## Data
Anonymized antimicrobial susceptibility data is provided by the Swiss Centre for Antibiotic resistance ([anresis.ch](http://anresis.ch)). Data is provided as delivered by the participating laboratories.
Data is updated frequently and contains susceptibility information for the previous 12 months.

## User Interface
The coloured circles displayed in the matrix represent the susceptibility of each bacterium (rows) to each antibiotic (columns). The circle size is logarithmically proportional to the sample size. Semi-transparent circles represent low sample sizes (N≤20). Data points with N≤5 are not displayed due to potential low data validity. The number in the center of the circle represents the percentage of susceptible samples. 
![Step 1][step1]


According to the percentage of susceptible samples, the colour of the circle changes gradually from green (100% susceptible) to red (0% susceptible). With changes in hue, saturation and lightness we have improved usability for people with red-green colour blindness:
![Step 2][step2]


When a susceptibility circle is hovered by a cursor (“mouse-over”) or tapped on a touch screen, the data’s details (susceptibility, sample size and 95% confidence interval (CI)) are displayed:
![Step 3][step3]


95% confidence interval of the percentage of susceptibles (CI): Agresti-Coull confidence intervals with “add two successes and two failures” adjustment.


Sample size: number of isolates for which resistance data to the given antibiotic are available (in the respective population if filters have been set). CI is based on this number.


[step1]: /tenant/infect-anresis/about/step1.svg "Step 1"
[step2]: /tenant/infect-anresis/about/step2.svg "Step2"
[step3]: /tenant/infect-anresis/about/step3.svg "Step3"


## Regions
![Map][map]

[map]: /tenant/infect-anresis-vet/about/map.svg "Map"


# Team and Support
INFECT by anresis.ch is designed, developed and operated by INFECT, a non-profit association under Swiss law (founded on Feb 13, 2016). 

The board (Vorstand) of the INFECT association is currently formed by (alphabetical order): 
- Silvio D. Brugger, MD, PhD; attending physician at the Department of Infectious Diseases and Hospital Epidemiology, University Hospital Zurich; INFECT founding member
- Pascal M. Frey MD, MSc; attending physician at the Department of General Internal Medicine, Bern University Hospital (Inselspital); INFECT founding member and president
- Felix Steiner, CEO at Joinbox Ltd. Bern; INFECT founding member
- Lina van der Weg, CTO at Joinbox Ltd. Bern; INFECT founding member


Verein INFECT
Pascal M. Frey
Dept. of General Internal Medicine
Inselspital
Berne, Switzerland


Software development and product design for the INFECT application is done by [Joinbox Ltd.](http://joinbox.com), a web and software development agency in Bern. 



INFECT VET by anresis.ch is supported by the Federal Food Safety and Veterinary Office (BLV) and and the Institute of Veterinary Bacteriology (University of Bern), and financed by BLV:
- Dr. med. vet. Dagmar Heim, Head of Veterinary Medicinal Products and Antibiotics, Federal Food Safety and Veterinary Office, Bern, Switzerland
- Dr. med. vet. Gudrun Overesch, Veterinary Office and the Institute of Veterinary Bacteriology, University of Bern, Bern, Switzerland

The INFECT project is supported by
- [Swiss Federal Office of Public Health (BAG)](https://www.bag.admin.ch/bag/en/home.html)
- [Swiss Centre for Antibiotic resistance (anresis.ch)](http://anresis.ch/)
- [Institute for Infectious Diseases, University of Bern](http://ifik.unibe.ch/)
- [Dept. of General Internal Medicine, University Hospital Bern (Inselspital)](http://www.inneremedizin.insel.ch/)
- [Joinbox Ltd., Bern](http://joinbox.com)
- [Swiss Federal Food Safety and Veterinary Office (BLV)](https://www.blv.admin.ch/blv/en/home.html)
- [Institute of Veterinary Bacteriology, University of Bern](https://www.vbi.unibe.ch/index_eng.html)


# Background Information


## Current INFECT Objectives
- Provide fast and intuitive access to the latest antimicrobial resistance data for clinically important pathogens
- Enable data to be tailored to the local resistance epidemiology and the patients’ setting.
- Assist health professionals with empirical treatment choices by integrating validated antimicrobial treatment guidelines from external sources


## Source Code
INFECT is an open source project developed under MIT license. You may [view and clone the source code on GitHub](https://github.com/infect-org).


## Terminology


### Empirical Antibiotic Therapy
An empirical antibiotic therapy (EAT) is an important clinical concept and a standard procedure for the treatment of many different types of infections in clinical medicine. It describes an antibiotic therapy of an infectious diagnosis, when the  actual causative agent is yet unknown. 
EAT is based on epidemiological data of most frequently isolated pathogens and their antibiotic resistance pattern for certain diseases. The adequacy of empirical antibiotics is an important determinant of patient outcomes and plays an important role in the emergence of bacterial antibiotic resistance.





# Disclaimer

INFECT – in collaboration with its partners – maintains this website to enhance public access to information about antibiotic resistance, treatment guidelines, antibiotic consumption, infection control and epidemiology. Our goal is to keep this information timely and accurate and to minimize disruption caused by technical errors. However, some data, information, content, or functions on our site may not be error-free and we cannot guarantee that our service will not be interrupted or otherwise affected by such problems.


Therefore, INFECT specifically DISCLAIMS LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES and assumes no responsibility or liability for any loss or damage suffered by any person as a result of the use or misuse of any of the information, content or function on this website or any linked external sites.


All information provided is:
- of a general nature only and not intended to address the specific circumstances of any particular individual or entity;
- not necessarily comprehensive, complete, accurate or up to date;
- sometimes linked to external sources over which INFECT has no control and for which INFECT assumes neither responsibility nor liability;
- not professional or medical advice for individual patients (if you need specific advice, you should always consult a suitably qualified professional).


Although INFECT is intended to be used to guide and support an optimal empirical antimicrobial therapy, its use does not substitute a thorough investigation of patients’ signs and symptoms, or sound diagnostic and therapeutic reasoning.


# Privacy Policy

INFECT Association built INFECT as an Open Source app.

This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use INFECT.

If you choose to use INFECT, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving INFECT. We will not use or share your information with anyone except as described in this Privacy Policy.

The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at INFECT unless otherwise defined in this Privacy Policy.

## Information Collection and Use

For a better experience, while using INFECT, we may require you to provide us with certain personally identifiable information, including but not limited to the IP address. The information that we request will be retained by us and used as described in this privacy policy.

The app does use third party services that may collect information used to identify you:

- [Google Analytics and Tag Manager](https://policies.google.com/privacy) (tracks usage, mobile and web app)
- [Sentry](https://sentry.io/privacy/) (records errors and warnings, mobile and web app)
- [Adobe Fonts](https://www.adobe.com/privacy/policies/adobe-fonts.html) (provides font, web app only)
- [Google Play Services](https://policies.google.com/privacy) (provides app download for Android, mobile app only)
- [Apple App Store](https://www.apple.com/legal/privacy/en-ww/) (provides app download for iOS, mobile app only)

Whenever you use INFECT, in a case of an error in the app we collect data and information (through third party products). This data may include information such as your device IP address, device name, operating system version, the configuration of the app when utilizing INFECT, the time and date of your use of INFECT, and other statistics.

## Cookies

INFECT uses cookies explicitly, e.g. to store your most frequently used filters. INFECT may also use third party code and libraries that use cookies to collect information and improve their services. If you use INFECT, you agree that such cookies are used.

## Service Providers

We may employ third-party companies and individuals to facilitate INFECT, to provide services on our behalf, to perform INFECT-related services, or to assist us in analyzing how INFECT is used.

These third parties may have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.

## Security

We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.

## Links to Other Sites

INFECT may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.

## Children’s Privacy

These Services do not address and are not intended to be used by anyone anyone under the age of 13. As we cannot know a user’s age, all our Personal Data is treated equally. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.

## Changes to This Privacy Policy

We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.

