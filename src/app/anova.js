$(document).ready(function () {
  debugger;
  let numberGroups = 0;
  if (Number($('#ctl00_MainContent_numGroups').val()) != -1) {
    numberGroups = Number($('#ctl00_MainContent_numGroups').val());
    if (numberGroups > 2) {
      let mean1 = Number($('#ctl00_MainContent_avg1').val());
      let mean2 = Number($('#ctl00_MainContent_avg2').val());
      let mean3 = Number($('#ctl00_MainContent_avg3').val());
      let mean4 = Number($('#ctl00_MainContent_avg4').val());
      let mean5 = Number($('#ctl00_MainContent_avg5').val());
      let msWithin = Number($('#ctl00_MainContent_withMs').val());
      let dfWithin = Number($('#ctl00_MainContent_withDf').val());
      let size = Number($('#ctl00_MainContent_size').val());
      $('#tukeyHSD').show();
      $('#tukeyTable tr').each(function (i, row) {
        if (numberGroups === 3 && i > numberGroups) {
          $(row).hide();
        } else if (numberGroups === 4 && i > numberGroups + 2) {
          $(row).hide();
        }
      });
      if (numberGroups === 3) {
        $('#ctl00_MainContent_Label34').html("HSD<sub>.05</sub> = " + (calculateQCrit(0.95, 3, dfWithin) * Math.sqrt((msWithin / size))).toFixed(4) + "<br />HSD<sub>.01</sub> = " + (calculateQCrit(0.99, 3, dfWithin) * Math.sqrt((msWithin / size))).toFixed(4));
        $('#ctl00_MainContent_Label42').html("Q<sub>.05</sub> = " + calculateQCrit(0.95, 3, dfWithin) + "&nbsp;&nbsp;&nbsp;&nbsp;Q<sub>.01</sub> = " + calculateQCrit(0.99, 3, dfWithin));
        $('#ctl00_MainContent_Label5').html("<strong>T<sub>2</sub>:T<sub>3</sub></strong>");
        //Do coding for 3 groups
        $('#ctl00_MainContent_Label29').html("M<sub>1</sub> = " + mean1.toFixed(2) + "<br />M<sub>2</sub> = " + mean2.toFixed(2));
        $('#ctl00_MainContent_Label30').html(Math.abs(mean1 - mean2).toFixed(2));
        if ((1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean2), msWithin, size), numberGroups, dfWithin))) < 0.05) {
          $('#ctl00_MainContent_Label31').html("<span style=\"color:blue\">Q = " + calculateQ(Math.abs(mean1 - mean2), msWithin, size).toFixed(2) + "</span> (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean2), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        } else {
          $('#ctl00_MainContent_Label31').html("Q = " + calculateQ(Math.abs(mean1 - mean2), msWithin, size).toFixed(2) + " (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean2), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        }
        $('#ctl00_MainContent_Label3').html("M<sub>1</sub> = " + mean1.toFixed(2) + "<br />M<sub>3</sub> = " + mean3.toFixed(2));
        $('#ctl00_MainContent_Label4').html(Math.abs(mean1 - mean3).toFixed(2));
        if ((1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean3), msWithin, size), numberGroups, dfWithin))) < 0.05) {
          $('#ctl00_MainContent_Label32').html("<span style=\"color:blue\">Q = " + calculateQ(Math.abs(mean1 - mean3), msWithin, size).toFixed(2) + "</span> (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean3), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        } else {
          $('#ctl00_MainContent_Label32').html("Q = " + calculateQ(Math.abs(mean1 - mean3), msWithin, size).toFixed(2) + " (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean3), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        }
        $('#ctl00_MainContent_Label6').html("M<sub>2</sub> = " + mean2.toFixed(2) + "<br />M<sub>3</sub> = " + mean3.toFixed(2));
        $('#ctl00_MainContent_Label7').html(Math.abs(mean2 - mean3).toFixed(2));
        if ((1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean2 - mean3), msWithin, size), numberGroups, dfWithin))) < 0.05) {
          $('#ctl00_MainContent_Label33').html("<span style=\"color:blue\">Q = " + calculateQ(Math.abs(mean2 - mean3), msWithin, size).toFixed(2) + "</span> (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean2 - mean3), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        } else {
          $('#ctl00_MainContent_Label33').html("Q = " + calculateQ(Math.abs(mean2 - mean3), msWithin, size).toFixed(2) + " (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean2 - mean3), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        }
      } else if (numberGroups === 4) {
        $('#ctl00_MainContent_Label34').html("HSD<sub>.05</sub> = " + (calculateQCrit(0.95, 4, dfWithin) * Math.sqrt((msWithin / size))).toFixed(4) + "<br />HSD<sub>.01</sub> = " + (calculateQCrit(0.99, 4, dfWithin) * Math.sqrt((msWithin / size))).toFixed(4));
        $('#ctl00_MainContent_Label42').html("Q<sub>.05</sub> = " + calculateQCrit(0.95, 4, dfWithin) + "&nbsp;&nbsp;&nbsp;&nbsp;Q<sub>.01</sub> = " + calculateQCrit(0.99, 4, dfWithin));
        $('#ctl00_MainContent_Label5').html("<strong>T<sub>1</sub>:T<sub>4</sub></strong>");
        $('#ctl00_MainContent_Label8').html("<strong>T<sub>2</sub>:T<sub>3</sub></strong>");
        $('#ctl00_MainContent_Label11').html("<strong>T<sub>2</sub>:T<sub>4</sub></strong>");
        $('#ctl00_MainContent_Label14').html("<strong>T<sub>3</sub>:T<sub>4</sub></strong>");
        //Do coding for 4 groups
        $('#ctl00_MainContent_Label29').html("M<sub>1</sub> = " + mean1.toFixed(2) + "<br />M<sub>2</sub> = " + mean2.toFixed(2));
        $('#ctl00_MainContent_Label30').html(Math.abs(mean1 - mean2).toFixed(2));
        if ((1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean2), msWithin, size), numberGroups, dfWithin))) < 0.05) {
          $('#ctl00_MainContent_Label31').html("<span style=\"color:blue\">Q = " + calculateQ(Math.abs(mean1 - mean2), msWithin, size).toFixed(2) + "</span> (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean2), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        } else {
          $('#ctl00_MainContent_Label31').html("Q = " + calculateQ(Math.abs(mean1 - mean2), msWithin, size).toFixed(2) + " (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean2), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        }
        $('#ctl00_MainContent_Label3').html("M<sub>1</sub> = " + mean1.toFixed(2) + "<br />M<sub>3</sub> = " + mean3.toFixed(2));
        $('#ctl00_MainContent_Label4').html(Math.abs(mean1 - mean3).toFixed(2));
        if ((1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean3), msWithin, size), numberGroups, dfWithin))) < 0.05) {
          $('#ctl00_MainContent_Label32').html("<span style=\"color:blue\">Q = " + calculateQ(Math.abs(mean1 - mean3), msWithin, size).toFixed(2) + "</span> (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean3), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        } else {
          $('#ctl00_MainContent_Label32').html("Q = " + calculateQ(Math.abs(mean1 - mean3), msWithin, size).toFixed(2) + " (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean3), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        }
        $('#ctl00_MainContent_Label6').html("M<sub>1</sub> = " + mean1.toFixed(2) + "<br />M<sub>4</sub> = " + mean4.toFixed(2));
        $('#ctl00_MainContent_Label7').html(Math.abs(mean1 - mean4).toFixed(2));
        if ((1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean4), msWithin, size), numberGroups, dfWithin))) < 0.05) {
          $('#ctl00_MainContent_Label33').html("<span style=\"color:blue\">Q = " + calculateQ(Math.abs(mean1 - mean4), msWithin, size).toFixed(2) + "</span> (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean4), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        } else {
          $('#ctl00_MainContent_Label33').html("Q = " + calculateQ(Math.abs(mean1 - mean4), msWithin, size).toFixed(2) + " (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean4), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        }
        $('#ctl00_MainContent_Label9').html("M<sub>2</sub> = " + mean2.toFixed(2) + "<br />M<sub>3</sub> = " + mean3.toFixed(2));
        $('#ctl00_MainContent_Label10').html(Math.abs(mean2 - mean3).toFixed(2));
        if ((1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean2 - mean3), msWithin, size), numberGroups, dfWithin))) < 0.05) {
          $('#ctl00_MainContent_Label35').html("<span style=\"color:blue\">Q = " + calculateQ(Math.abs(mean2 - mean3), msWithin, size).toFixed(2) + "</span> (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean2 - mean3), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        } else {
          $('#ctl00_MainContent_Label35').html("Q = " + calculateQ(Math.abs(mean2 - mean3), msWithin, size).toFixed(2) + " (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean2 - mean3), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        }
        $('#ctl00_MainContent_Label12').html("M<sub>2</sub> = " + mean2.toFixed(2) + "<br />M<sub>4</sub> = " + mean4.toFixed(2));
        $('#ctl00_MainContent_Label13').html(Math.abs(mean2 - mean4).toFixed(2));
        if ((1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean2 - mean4), msWithin, size), numberGroups, dfWithin))) < 0.05) {
          $('#ctl00_MainContent_Label36').html("<span style=\"color:blue\">Q = " + calculateQ(Math.abs(mean2 - mean4), msWithin, size).toFixed(2) + "</span> (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean2 - mean4), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        } else {
          $('#ctl00_MainContent_Label36').html("Q = " + calculateQ(Math.abs(mean2 - mean4), msWithin, size).toFixed(2) + " (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean2 - mean4), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        }
        $('#ctl00_MainContent_Label15').html("M<sub>3</sub> = " + mean3.toFixed(2) + "<br />M<sub>4</sub> = " + mean4.toFixed(2));
        $('#ctl00_MainContent_Label16').html(Math.abs(mean3 - mean4).toFixed(2));
        if ((1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean3 - mean4), msWithin, size), numberGroups, dfWithin))) < 0.05) {
          $('#ctl00_MainContent_Label37').html("<span style=\"color:blue\">Q = " + calculateQ(Math.abs(mean3 - mean4), msWithin, size).toFixed(2) + "</span> (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean3 - mean4), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        } else {
          $('#ctl00_MainContent_Label37').html("Q = " + calculateQ(Math.abs(mean3 - mean4), msWithin, size).toFixed(2) + " (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean3 - mean4), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        }
      } else {
        $('#ctl00_MainContent_Label34').html("HSD<sub>.05</sub> = " + (calculateQCrit(0.95, 5, dfWithin) * Math.sqrt((msWithin / size))).toFixed(4) + "<br />HSD<sub>.01</sub> = " + (calculateQCrit(0.99, 5, dfWithin) * Math.sqrt((msWithin / size))).toFixed(4));
        $('#ctl00_MainContent_Label42').html("Q<sub>.05</sub> = " + calculateQCrit(0.95, 5, dfWithin) + "&nbsp;&nbsp;&nbsp;&nbsp;Q<sub>.01</sub> = " + calculateQCrit(0.99, 5, dfWithin));
        $('#ctl00_MainContent_Label5').html("<strong>T<sub>1</sub>:T<sub>4</sub></strong>");
        $('#ctl00_MainContent_Label8').html("<strong>T<sub>1</sub>:T<sub>5</sub></strong>");
        $('#ctl00_MainContent_Label11').html("<strong>T<sub>2</sub>:T<sub>3</sub></strong>");
        $('#ctl00_MainContent_Label14').html("<strong>T<sub>2</sub>:T<sub>4</sub></strong>");
        $('#ctl00_MainContent_Label17').html("<strong>T<sub>2</sub>:T<sub>5</sub></strong>");
        $('#ctl00_MainContent_Label20').html("<strong>T<sub>3</sub>:T<sub>4</sub></strong>");
        $('#ctl00_MainContent_Label23').html("<strong>T<sub>3</sub>:T<sub>5</sub></strong>");
        $('#ctl00_MainContent_Label26').html("<strong>T<sub>4</sub>:T<sub>5</sub></strong>");
        //Do coding for 5 groups
        $('#ctl00_MainContent_Label29').html("M<sub>1</sub> = " + mean1.toFixed(2) + "<br />M<sub>2</sub> = " + mean2.toFixed(2));
        $('#ctl00_MainContent_Label30').html(Math.abs(mean1 - mean2).toFixed(2));
        if ((1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean2), msWithin, size), numberGroups, dfWithin))) < 0.05) {
          $('#ctl00_MainContent_Label31').html("<span style=\"color:blue\">Q = " + calculateQ(Math.abs(mean1 - mean2), msWithin, size).toFixed(2) + "</span> (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean2), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        } else {
          $('#ctl00_MainContent_Label31').html("Q = " + calculateQ(Math.abs(mean1 - mean2), msWithin, size).toFixed(2) + " (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean2), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        }
        $('#ctl00_MainContent_Label3').html("M<sub>1</sub> = " + mean1.toFixed(2) + "<br />M<sub>3</sub> = " + mean3.toFixed(2));
        $('#ctl00_MainContent_Label4').html(Math.abs(mean1 - mean3).toFixed(2));
        if ((1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean3), msWithin, size), numberGroups, dfWithin))) < 0.05) {
          $('#ctl00_MainContent_Label32').html("<span style=\"color:blue\">Q = " + calculateQ(Math.abs(mean1 - mean3), msWithin, size).toFixed(2) + "</span> (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean3), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        } else {
          $('#ctl00_MainContent_Label32').html("Q = " + calculateQ(Math.abs(mean1 - mean3), msWithin, size).toFixed(2) + " (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean3), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        }
        $('#ctl00_MainContent_Label6').html("M<sub>1</sub> = " + mean1.toFixed(2) + "<br />M<sub>4</sub> = " + mean4.toFixed(2));
        $('#ctl00_MainContent_Label7').html(Math.abs(mean1 - mean4).toFixed(2));
        if ((1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean4), msWithin, size), numberGroups, dfWithin))) < 0.05) {
          $('#ctl00_MainContent_Label33').html("<span style=\"color:blue\">Q = " + calculateQ(Math.abs(mean1 - mean4), msWithin, size).toFixed(2) + "</span> (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean4), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        } else {
          $('#ctl00_MainContent_Label33').html("Q = " + calculateQ(Math.abs(mean1 - mean4), msWithin, size).toFixed(2) + " (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean4), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        }
        $('#ctl00_MainContent_Label9').html("M<sub>1</sub> = " + mean1.toFixed(2) + "<br />M<sub>5</sub> = " + mean5.toFixed(2));
        $('#ctl00_MainContent_Label10').html(Math.abs(mean1 - mean5).toFixed(2));
        if ((1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean5), msWithin, size), numberGroups, dfWithin))) < 0.05) {
          $('#ctl00_MainContent_Label35').html("<span style=\"color:blue\">Q = " + calculateQ(Math.abs(mean1 - mean5), msWithin, size).toFixed(2) + "</span> (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean5), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        } else {
          $('#ctl00_MainContent_Label35').html("Q = " + calculateQ(Math.abs(mean1 - mean5), msWithin, size).toFixed(2) + " (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean1 - mean5), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        }
        $('#ctl00_MainContent_Label12').html("M<sub>2</sub> = " + mean2.toFixed(2) + "<br />M<sub>3</sub> = " + mean3.toFixed(2));
        $('#ctl00_MainContent_Label13').html(Math.abs(mean2 - mean3).toFixed(2));
        if ((1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean2 - mean3), msWithin, size), numberGroups, dfWithin))) < 0.05) {
          $('#ctl00_MainContent_Label36').html("<span style=\"color:blue\">Q = " + calculateQ(Math.abs(mean2 - mean3), msWithin, size).toFixed(2) + "</span> (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean2 - mean3), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        } else {
          $('#ctl00_MainContent_Label36').html("Q = " + calculateQ(Math.abs(mean2 - mean3), msWithin, size).toFixed(2) + " (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean2 - mean3), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        }
        $('#ctl00_MainContent_Label15').html("M<sub>2</sub> = " + mean2.toFixed(2) + "<br />M<sub>4</sub> = " + mean4.toFixed(2));
        $('#ctl00_MainContent_Label16').html(Math.abs(mean2 - mean4).toFixed(2));
        if ((1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean2 - mean4), msWithin, size), numberGroups, dfWithin))) < 0.05) {
          $('#ctl00_MainContent_Label37').html("<span style=\"color:blue\">Q = " + calculateQ(Math.abs(mean2 - mean4), msWithin, size).toFixed(2) + "</span> (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean2 - mean4), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        } else {
          $('#ctl00_MainContent_Label37').html("Q = " + calculateQ(Math.abs(mean2 - mean4), msWithin, size).toFixed(2) + " (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean2 - mean4), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        }
        $('#ctl00_MainContent_Label18').html("M<sub>2</sub> = " + mean2.toFixed(2) + "<br />M<sub>5</sub> = " + mean5.toFixed(2));
        $('#ctl00_MainContent_Label19').html(Math.abs(mean2 - mean5).toFixed(2));
        if ((1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean2 - mean5), msWithin, size), numberGroups, dfWithin))) < 0.05) {
          $('#ctl00_MainContent_Label38').html("<span style=\"color:blue\">Q = " + calculateQ(Math.abs(mean2 - mean5), msWithin, size).toFixed(2) + "</span> (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean2 - mean5), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        } else {
          $('#ctl00_MainContent_Label38').html("Q = " + calculateQ(Math.abs(mean2 - mean5), msWithin, size).toFixed(2) + " (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean2 - mean5), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        }
        $('#ctl00_MainContent_Label21').html("M<sub>3</sub> = " + mean3.toFixed(2) + "<br />M<sub>4</sub> = " + mean4.toFixed(2));
        $('#ctl00_MainContent_Label22').html(Math.abs(mean3 - mean4).toFixed(2));
        if ((1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean3 - mean4), msWithin, size), numberGroups, dfWithin))) < 0.05) {
          $('#ctl00_MainContent_Label39').html("<span style=\"color:blue\">Q = " + calculateQ(Math.abs(mean3 - mean4), msWithin, size).toFixed(2) + "</span> (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean3 - mean4), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        } else {
          $('#ctl00_MainContent_Label39').html("Q = " + calculateQ(Math.abs(mean3 - mean4), msWithin, size).toFixed(2) + " (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean3 - mean4), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        }
        $('#ctl00_MainContent_Label24').html("M<sub>3</sub> = " + mean3.toFixed(2) + "<br />M<sub>5</sub> = " + mean5.toFixed(2));
        $('#ctl00_MainContent_Label25').html(Math.abs(mean3 - mean5).toFixed(2));
        if ((1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean3 - mean5), msWithin, size), numberGroups, dfWithin))) < 0.05) {
          $('#ctl00_MainContent_Label40').html("<span style=\"color:blue\">Q = " + calculateQ(Math.abs(mean3 - mean5), msWithin, size).toFixed(2) + "</span> (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean3 - mean5), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        } else {
          $('#ctl00_MainContent_Label40').html("Q = " + calculateQ(Math.abs(mean3 - mean5), msWithin, size).toFixed(2) + " (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean3 - mean5), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        }
        $('#ctl00_MainContent_Label27').html("M<sub>4</sub> = " + mean4.toFixed(2) + "<br />M<sub>5</sub> = " + mean5.toFixed(2));
        $('#ctl00_MainContent_Label28').html(Math.abs(mean4 - mean5).toFixed(2));
        if ((1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean4 - mean5), msWithin, size), numberGroups, dfWithin))) < 0.05) {
          $('#ctl00_MainContent_Label41').html("<span style=\"color:blue\">Q = " + calculateQ(Math.abs(mean4 - mean5), msWithin, size).toFixed(2) + "</span> (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean4 - mean5), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        } else {
          $('#ctl00_MainContent_Label41').html("Q = " + calculateQ(Math.abs(mean4 - mean5), msWithin, size).toFixed(2) + " (<i>p</i> = " + (1 - (jStat.tukey.cdf(calculateQ(Math.abs(mean4 - mean5), msWithin, size), numberGroups, dfWithin))).toFixed(5).substring(1) + ")");
        }
      }
    } else {
      $('#tukeyHSD').hide();
    }
  } else {
    $('#tukeyHSD').hide();
  }
});

function calculateQ(difference, mswg, nps) {
  return difference / (Math.sqrt((mswg / nps)));
}

function calculateQCrit(crit, number, df) {
  return jStat.tukey.inv(crit, number, df).toFixed(4);
}

function checkPvalue(q, pvalue, critvalue30, critvalue5, critvalue1) {
  if (pvalue < 0.01 && q < critvalue1) {
    return false;
  }
  if (pvalue < 0.05 && q < critvalue5) {
    return false;
  }
  if (pvalue < 0.30 && q < critvalue30) {
    return false;
  }
  return true;
}
