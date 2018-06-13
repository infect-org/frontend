import React from 'react';
import { observer } from 'mobx-react';
import GuidedTourButton from '../guidedTour/guidedTourButton';
//import debug from 'debug';
//const log = debug('infect:InfoOverlay');

@observer
export default class InfoOverlay extends React.Component {

	render() {
		return (
			<div className={ 'overlay ' + (this.props.infoOverlay.visible ? 'overlay--open' : '') }>
				<div className="overlay__menu">
					<ol className="menu">
						<li className="menu-item"><a href="#introduction">Introduction</a></li>
						<li className="menu-item"><a href="#guide">Using Infect</a></li>
						<li className="menu-item"><a href="#source">Source Code</a></li>
						<li className="menu-item"><a href="#team">Team</a></li>
						<li className="menu-item"><a href="#contact">Contact</a></li>
						<li className="menu-item"><a href="#partners">Partners</a></li>
						<li className="menu-item"><a href="#disclaimer">Disclaimer</a></li>
					</ol>
				</div>
				<div className="overlay__container">
					<h1 id="introduction">Introduction</h1>
					<p>Supported by the <a href="https://www.bag.admin.ch/bag/en/home.html" target="_blank">Federal Office of Public Health</a> and the <a href="http://ifik.unibe.ch" target="_blank">Institute for Infectious Diseases Bern</a>, the project INFECT, an INterface For Empirical antimicrobial ChemoTherapy, has been developed. It is aimed at providing a fast and intuitive access to the latest antimicrobial resistance data to assist health professionals with empirical treatment choices tailored to the resistance epidemiology in the patients’ geographical region.</p>
					<p>An empirical antibiotic therapy (EAT) is an important clinical concept and a standard procedure for the treatment of many different types of infections in clinical medicine. Its need is based on the lack of knowledge of the causative agent at an early stage of the disease - usually when the patient presents to health professionals. EAT is based on epidemiological data on most frequently isolated pathogens and their antibiotic resistance pattern for certain diseases (e.g., <i>S. pneumoniae</i>, <i>H. influenzae</i>, and <i>M.catarrhalis</i> for otitis media [middle ear infection]). The adequacy of empirical antibiotics is an important determinant of patient outcomes and may play a role in the emergence of bacterial antibiotic resistance. While in Switzerland, the collection of antimicrobial resistance data has been coordinated through anresis.ch for over a decade - with the data being analysed and used to support antimicrobial treatment guidelines - an accessible and easy-to-use platform to visualise this data has yet been lacking.</p>
					
					<h1 id="guide">Using INFECT</h1>
                    { /* Always «Start/stop guided tour» because it's not stoppable anywhere else
					  if user has decided to hide disclaimer */ }
					<div className="guide">Interactive INFECT tour: <GuidedTourButton guidedTour={ this.props.guidedTour }></GuidedTourButton></div>
					<p>The coloured circles displayed in the bacteria-antimicrobial matrix represent data regarding the susceptibility of each bacterium (left column) to each antibiotic (top row). The circle size is logarithmically proportional to the sample size, while semi-transparent circles represent low sample sizes (N ≤ 20). The number in the middle of the circle represents the percentage of susceptible samples:</p>
					<img className="image--fullwidth" src="dist/img/step1.svg" alt="Step 1" />
					
					<p>According to the percentage of susceptible samples, the colour of the circle changes gradually from green (100% susceptible) to red (0% susceptible):</p>
					<img className="image--fullwidth" src="dist/img/step2.svg" alt="Step 2" />
					
					<p>When a susceptibility circle is hovered by a cursor (“mouse-over”) or tabbed on a touch screen, the data’s details (susceptibility, sample size and 95% confidence interval) are displayed:</p>
					<img className="image--fullwidth" src="dist/img/step3.svg" alt="Step 3" />

					<p className="overlay__paragraph--footnote"><strong>95% confidence interval</strong> of the percentage of susceptibles: Agresti - Coull confidence intervals with “add two successes and two failures” adjustment.</p>
					<p className="overlay__paragraph--footnote"><strong>Sample Size:</strong> number of isolates for which resistance data to the given antibiotic are available in the database (and in the respective population if filters have been set). CI is based on this number.</p>
					
					<h3>Regions</h3>
					<img className="image--fullwidth" src="dist/img/map.svg" alt="Map" />
					<p>For further information, please consult <a href="http://www.anresis.ch/index.php/definition-der-auswahlkriterien.html#Regions" target="_blank">the interacitve map of anresis</a>.</p>
					
					<h3>Data</h3>
					<p>INFECT imports an anonymised subset of the latest 365 days of bacterial resistance data from <a href="http://www.anresis.ch" target="_blank">the Swiss Center for Antibiotic resistance</a>, including all clinically important pathogens. The import is run monthly.</p>
					<p>For any questions regarding anresis.ch data kindly contact <a href="mailto:anresis@ifik.unibe.ch">anresis@ifik.unibe.ch</a></p>
					
					<h1 id="source">Source Code</h1>
					<p>INFECT is an open source project developed under MIT license. You may view and clone the source code on <a href="https://github.com/infect-org" target="_blank">GitHub</a>.</p>

					<h1 id="team">Team</h1>
					<p>The INFECT team is organized as a non-profit <a href="https://www.admin.ch/opc/en/classified-compilation/19070042/index.html#id-ni2-ni6-ni8" target="_blank">association</a> and consists of highly motivated members (alphabetical order):</p>
					<p>
						<strong>Silvio D. Brugger</strong>, MD, PhD, staff physician at the Department of Infectious Diseases and Hospital Epidemiology, University Hospital Zurich<br/>
						<strong>Pascal M. Frey</strong>, MD, MSc, INFECT project leader, staff physician at the Department of General Internal Medicine, Inselspital Bern<br/>
						<strong>Markus Hilty</strong>, PhD, senior researcher at the Institute for Infectious Diseases Bern<br/>
						<strong>Fabian Jordi</strong>, layout designer and CSS programmer at Joinbox GmbH Bern<br/>
						<strong>Tobias Kneubühler</strong>, database developer and programmer at Joinbox GmbH Bern<br/>
						<strong>Raphael Marti</strong>, responsible for marketing, distribution and administration<br/>
						<strong>Felix Steiner</strong>, graphics designer and programmer, and CEO at Joinbox GmBH Bern<br/>
						<strong>Michael van der Weg</strong>, software architect, database and API programmer, and CTO at Joinbox GmbH Bern
					</p>
					<p>* <a href="http://www.joinbox.com/" target="_blank">Joinbox GmbH</a> is a web agency from Bern. They work not for but with our customers to build web applications that solve complex problems with simple user interfaces. Like this one.</p>

					<h1 id="contact">Contact</h1>
					<p>Questions or feedback regarding the INFECT Project</p>
					<div className="adresses">
						<address>
							Pascal Frey, MD, MSc<br/>
							INFECT Project Leader<br/>
							<a href="mailto:info@infect.info">info@infect.info</a><br/>
							Department of General Internal Medicine<br/>
							Berne University Hospital, 3010 Bern<br/>
						</address>
					</div>

					<p>INFECT is developed and maintained by Joinbox</p>
					<div className="adresses">
						<address>
							Joinbox GmbH<br/>
							<a href="mailto:hello@joinbox.com">hello@joinbox.com</a><br/>
							3012 Bern<br/>
						</address>
					</div>
					
					<h1 id="partners">Partners</h1>
					<p>
						<a href="http://www.anresis.ch" target="_blank">Swiss Centre for Antibiotic resistance (anresis)</a><br/>
						<a href="http://ifik.unibe.ch" target="_blank">Institute for Infectious Diseases, University of Bern</a><br/>
						<a href="https://www.bag.admin.ch/bag/en/home.html" target="_blank">Swiss Federal Office of Public Health</a>
					</p>
					
					<h1 id="disclaimer">Disclaimer</h1>
					<p>INFECT maintains this website to enhance public access to information about antibiotic resistance, antibiotic consumption and its control. Our goal is to keep this information timely and accurate and to minimize disruption caused by technical errors. However, some data or information on our site may have been created or structured in files or formats that are not error-free and we cannot guarantee that our service will not be interrupted or otherwise affected by such problems. If errors are brought to our attention, we will try to correct them as soon as possible.</p>
					<p>INFECT accepts no responsibility or liability with regard to such problems incurred as a result of using this site or any linked external sites.</p>
					<p>This information is:</p>
					<ul>
						<li>of a general nature only and is not intended to address the specific circumstances of any particular individual or entity;</li>
						<li>not necessarily comprehensive, complete, accurate or up to date;</li>
						<li>sometimes linked to external sources over which INFECT has no control and for which INFECT assumes neither responsibility nor liability;</li>
						<li>not professional or medical advice (if you need specific advice, you should always consult a suitably qualified professional).</li>
					</ul>
					<p>Although INFECT is intended to be used to guide and support an optimal empirical antimicrobial therapy, its use does not substitute a thorough investigation of patients’ signs and symptoms, or sound diagnostic and therapeutic reasoning. Although all data is routinely checked for correctness, there is always a possibility of error. Therefore, INFECT specifically DISCLAIMS LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES and assumes no responsibility or liability for any loss or damage suffered by any person as a result of the use or misuse of any of the information or content on this website.</p>
				</div>
			</div>
		);
	}

}
