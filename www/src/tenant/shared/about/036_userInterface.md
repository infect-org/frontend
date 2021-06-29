## User Interface
The coloured circles displayed in the matrix represent the susceptibility of each bacterium (rows) to each antibiotic (columns). The circle size is logarithmically proportional to the sample size. Semi-transparent circles represent low sample sizes (default N≤20). Data points with N≤5 are not displayed due to potential low data validity. The number in the center of the circle represents the percentage of susceptible samples. 
![Step 1][step1]


According to the percentage of susceptible samples, the colour of the circle changes gradually from green (100% susceptible) to red (0% susceptible). With changes in hue, saturation and lightness we have improved usability for people with red-green colour blindness:
![Step 2][step2]


When a susceptibility circle is hovered by a cursor (“mouse-over”) or tapped on a touch screen, the data’s details (susceptibility, sample size and 95% confidence interval (CI)) are displayed:
![Step 3][step3]


95% confidence interval of the percentage of susceptibles (CI): Agresti-Coull confidence intervals with “add two successes and two failures” adjustment.


Sample size: number of isolates for which resistance data to the given antibiotic are available (in the respective population if filters have been set). CI is based on this number.


[step1]: /tenant/shared/about/step1.svg "Step 1"
[step2]: /tenant/shared/about/step2.svg "Step2"
[step3]: /tenant/shared/about/step3.svg "Step3"

