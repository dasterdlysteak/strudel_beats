Controls Description

* Play/Stop Button – Starts and stops audio playback.
* Next/Prev Buttons - Navigates forward or backward through the song list
* Volume Slider - controls global volume of all instruments blocks.
* Mute Button - Mutes all selected instrument blocks.
* Instrument Selector – Checkboxes to choose instrument block (programmatically generated).
* Vertical Mixer Sliders – Adjust high band filter cutoff, pitch and reverb amount for the selected instrument blocks.
* Tempo Control – Numeric input to set BPM (alert used for numeric validation).
* Load Button – File input for loading JSON song code from the users system.
* Save Button – Saves current SongText to JSON format and downloads to the users system.



Quirks / Usage Guidelines for Markers

* Mixer Sliders - Reverb and highs slider start at 0 from the bottom, pitch slider starts at 0 in the middle (bottom is one octave below, top is one octave above)
* Volume - Volume Control distorts the drums2: track quite badly feel free to select it in the mixer and mute
* SongText - any added Strudal music needs to match the structure of the already present examples
* Save/Load - when loading a saved songText the name you gave the mix replaces the title of the song - original code artist remains



Demonstration Video

* https://youtu.be/xQXN2zPlz1w



Song Code Used

* Vermin Mangle - eefano - https://github.com/eefano/strudel-songs-collection/blob/main/verminmangle.js



The following is a restructured version that matches the structure requirements of my React app:

setcps(52/60/1)

// "Vermin Mangle" (work in progress)
// song @by Tim Smith (Cardiacs)
// script @by eefano

melody:
note("<f#4 ~ c#5@3 ~ a#4@2 g#4 ~ f#4 ~ a4@2 g#4 ~ f#4 ~ e4 ~ d4@2 ~@2 >\*6")
.sound("gm\_trumpet")
.pan(.3)
.gain(.6)

chords:
chord("<F#@2 E7@2 F#@2 E D F# D E F# B E F# E G D B E F# D E F#@2 E@2>")
.anchor("E4")
.voicing()
.s("gm\_accordion:2")
.struct("\[~ x x]")
.clip(.6)
.pan(.4)
.gain(.4)

bass:
n("\[0 ~ ~]")
.chord("<F#@2 E7@2>")
.mode("root")
.anchor("f#2")
.voicing()
.s("gm\_tuba:3")
.gain(1)





AI Usage:
Minimal AI was used throughout the creation of this React App apart from the following specified excerpts all code is completed by myself or shamelessly stolen from StackOverflow/youtube/bootstrap and edited to suit the needs of the application



* D3: copilot didn't save the exact interaction in which it guided me in completing the D3 Graph so below is a recreation, as such it is much closer to the actual final code in the project than the original guiding code co-pilot provided (I really just copied the class example but needed help getting the colour gradient to display correctly so turned to co-pilot) with this in mind, below is a somewhat accurate re creation of the information acquired from the AI model



how would / should I go about adding a visualiser single  bar graph in D3 (like one of those mixer monitors for volume/gain)?

Got it — you want a VU-style single bar visualiser in D3, like a mixer fader that moves up and down with volume/gain. Let’s break it down step by step so you can wire it up cleanly:

🛠 Step-by-Step Plan

1. Set up your SVG container
   You’ll need an SVG with a fixed width/height to draw the bar inside.
   const svg = d3.select("#barChart")
   .append("svg")
   .attr("width", 100)
   .attr("height", 300);



2\. Define scales
Map your audio value (say 0–100) to pixel height.
const h = +svg.attr("height");

const yScale = d3.scaleLinear()
.domain(\[0, 100])   // input: volume range
.range(\[h, 0]);     // output: pixel position



3. Add a background track
   This is the “slot” the bar slides in.
   svg.append("rect")
   .attr("x", 20)
   .attr("y", 0)
   .attr("width", 60)
   .attr("height", h)
   .attr("fill", "#222")
   .attr("stroke", "black")
   .attr("stroke-width", 2);



1. Add gradient fill
   So the bar shows green → yellow → red like a mixer.
   const defs = svg.append("defs");
   const gradient = defs.append("linearGradient")
   .attr("id", "vu-gradient")
   .attr("gradientUnits", "objectBoundingBox") // compresses into rect
   .attr("x1", 0).attr("y1", 1)
   .attr("x2", 0).attr("y2", 0);

gradient.append("stop").attr("offset", "0%").attr("stop-color", "green");
gradient.append("stop").attr("offset", "50%").attr("stop-color", "yellow");
gradient.append("stop").attr("offset", "100%").attr("stop-color", "red");



5. Add the dynamic bar
   This rectangle will update with your volume value.
   const bar = svg.append("rect")
   .attr("x", 20)
   .attr("width", 60)
   .attr("fill", "url(#vu-gradient)")
   .attr("stroke", "black")
   .attr("stroke-width", 2);
   
6. Update function
   Whenever your volume changes, update the bar height and position.
   function updateBar(volume) {
   bar
   .attr("y", yScale(volume))
   .attr("height", h - yScale(volume));
   }



Call updateBar(globalVolume) inside your useEffect or audio loop.



* General Questions:
  There were various times in which I needed to ask a coding question such as how some of the react coding features worked
  in which I asked AI but as the responses did not directly inform the code I was writing are not included.



* Regex -
  I had originally attempted to use AI to generate my regex's - this worked for simple things but proved pretty useless it provided minor guidance on the deep dive into Regex I had to undertake to write a regex that actually worked (in fairness to the AI, the regex I needed was silly and if I was to undertake this assignment from scratch I would forgo the use of regex altogether).
