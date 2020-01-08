# Introduction
INFECT – an __IN__terface For __E__mpirical __a__ntimicrobial __C__hemoTherapy – provides intuitive access to the latest data regarding microbes, antibiotic susceptibility and antibiotic treatment recommendations. INFECT aims to innovate patient care, reduce antimicrobial resistance, and save lives.

# Feedback
Feedback is very welcome. Please write to [info@infect.info](mailto:info@infect.info) for issues regarding INFECT.

# INFECT Mobile App
INFECT is available as an app for your smartphone and tablet:
[![Apple Store][app-store-icon]](https://itunes.apple.com/us/app/infect/id1422829703?ls=1&mt=8)
[![Google Play Store][google-play-icon]](https://play.google.com/store/apps/details?id=info.infect.app)

# Using INFECT

## Guided Tour
Interactive INFECT tour: [tourguideButton](#tourguideButton)

## Data
Anonymized antimicrobial susceptibility data is provided by the Swiss Centre for Antibiotic resistance (anresis.ch). Data are provided as delivered by the participating laboratories. 
Data is updated on a monthly basis and contains susceptibility information for the previous 12 months.

## User Interface
The coloured circles displayed in the matrix represent the susceptibility of each bacterium (rows) to each antibiotic (columns). The circle size is logarithmically proportional to the sample size. Semi-transparent circles represent low sample sizes (N≤20). Data points with N≤5 are not displayed due to low data validity. The number in the center of the circle represents the percentage of susceptible samples. 
![Step 1][step1]


According to the percentage of susceptible samples, the colour of the circle changes gradually from green (100% susceptible) to red (0% susceptible). With changes in hue, saturation and lightness we have improved usability for people with red-green colour blindness:
![Step 2][step2]


When a susceptibility circle is hovered by a cursor (“mouse-over”) or tapped on a touch screen, the data’s details (susceptibility, sample size and 95% confidence interval (CI)) are displayed:
![Step 3][step3]


95% confidence interval of the percentage of susceptibles (CI): Agresti-Coull confidence intervals with “add two successes and two failures” adjustment.


Sample size: number of isolates for which resistance data to the given antibiotic are available (in the respective population if filters have been set). CI is based on this number.


The antimicrobial treatment guideline data are based on guidelines from the Swiss Society for Infectious Diseases (SSI), published on ssi.guidelines.ch

## Regions
![Map][map]
For further information, please consult the interactive map of anresis.ch.

# Team and Support
INFECT by anresis.ch is designed, developed and operated by INFECT, a non-profit association under Swiss law (founded on Feb 13, 2016). 


INFECT association consists of (alphabetical order): 
- Silvio D. Brugger, MD, PhD, physician at the Department of Infectious Diseases and Hospital Epidemiology, University Hospital Zurich
- Pascal M. Frey, MD, MSc, INFECT project leader, physician at the Department of General Internal Medicine, Inselspital Bern
- Markus Hilty, PhD, senior researcher at the Institute for Infectious Diseases Bern
- Fabian Jordi, layout designer and CSS programmer at Joinbox Ltd. Bern
- Tobias Kneubühler, database developer and programmer at Joinbox Ltd. Bern
- Raphael Marti, responsible for marketing and administration at Joinbox Ltd. Bern
- Felix Steiner, MLaw, designer and developer, and CEO at Joinbox Ltd. Bern
- Michael van der Weg, software architect, database and API programmer, and CTO at Joinbox Ltd. Bern


Verein INFECT, Pascal M. Frey, Dept. of General Internal Medicine, Inselspital, Berne, Switzerland


Software development and product design for the INFECT application is done by Joinbox Ltd., a web and software development agency in Bern. 


The resistance data displayed is provided by the Swiss Centre for Antibiotic resistance (anresis.ch):
- Prof. Andreas Kronenberg, MD, Head of project anresis.ch, Institute for Infectious Diseases, University of Bern, Bern, Switzerland 
- Michael Gasser, PhD, Epidemiologist, Institute for Infectious Diseases, University of Bern, Bern, Switzerland


The INFECT project is supported by
- Swiss Federal Office of Public Health
- Swiss Centre for Antibiotic resistance (anresis.ch)
- Institute for Infectious Diseases, University of Bern
- Dept. of General Internal Medicine, University Hospital Bern (Inselspital)
- Joinbox Ltd., Bern

# Background Information

## Current INFECT Objectives
- Provide fast and intuitive access to the latest antimicrobial resistance data for clinically important pathogens
- Enable data to be tailored to the local resistance epidemiology and the patients’ setting.
- Assist health professionals with empirical treatment choices by integrating validated antimicrobial treatment guidelines from external sources

## Source Code
INFECT is an open source project developed under MIT license. You may view and clone the source code on GitHub.

## Terminology
### Empirical Antibiotic Therapy
An empirical antibiotic therapy (EAT) is an important clinical concept and a standard procedure for the treatment of many different types of infections in clinical medicine. It describes an antibiotic therapy of an infectious diagnosis, when the  actual causative agent is yet unknown. 
EAT is based on epidemiological data of most frequently isolated pathogens and their antibiotic resistance pattern for certain diseases (e.g., S. pneumoniae, H. influenzae, and M.catarrhalis for otitis media [middle ear infection]). The adequacy of empirical antibiotics is an important determinant of patient outcomes and plays an important role in the emergence of bacterial antibiotic resistance.

### Specific Antibiotic Therapy
Once the causative agent of an infection is known, antibiotic treatment can usually be switched to a narrow-spectrum substance to target that specific organism. This concept is described as a specific therapy.

### Primary Therapy
The antibiotic treatment recommended by a guideline as a first-line choice, including in case of special circumstances like antibiotic allergies when the generally recommended first-line choice is not an option for some patients.

### Alternative Therapy
The antibiotic treatment recommended by a guideline as an optional choice instead of the primary therapy due to non-binding reasons (eg., availability, convenience, or patient preference).


# Disclaimer
INFECT in collaboration with anresis.ch and SSI maintains this website to enhance public access to information about antibiotic resistance, treatment guidelines, antibiotic consumption, infection control and epidemiology. Our goal is to keep this information timely and accurate and to minimize disruption caused by technical errors. However, some data, information, content or functions on our site may not be error-free and we cannot guarantee that our service will not be interrupted or otherwise affected by such problems.


Therefore, INFECT specifically DISCLAIMS LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES and assumes no responsibility or liability for any loss or damage suffered by any person as a result of the use or misuse of any of the information, content or function on this website or any linked external sites.


All information provided is:
- of a general nature only and not intended to address the specific circumstances of any particular individual or entity;
- not necessarily comprehensive, complete, accurate or up to date;
- sometimes linked to external sources over which INFECT has no control and for which INFECT assumes neither responsibility nor liability;
- not professional or medical advice for individual patients (if you need specific advice, you should always consult a suitably qualified professional).


Although INFECT is intended to be used to guide and support an optimal empirical antimicrobial therapy, its use does not substitute a thorough investigation of patients’ signs and symptoms, or sound diagnostic and therapeutic reasoning.

[app-store-icon]: /tenant/infect-anresis/about/app-store-icon.png "Apple Store"
[google-play-icon]: /tenant/infect-anresis/about/google-play-icon.png "Google Play Store"
[step1]: /tenant/infect-anresis/about/step1.svg "Step 1"
[step2]: /tenant/infect-anresis/about/step2.svg "Step2"
[step3]: /tenant/infect-anresis/about/step3.svg "Step3"
[map]: /tenant/infect-anresis/about/map.svg "Map"