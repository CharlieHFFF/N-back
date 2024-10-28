import { JsPsych } from "jspsych";
import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response'

export function createNbackStim(jsPsych: JsPsych, n: number, stimuli: any, num_trials: number, rep_ratio: number) {
    const trial_sequence: any[] = [];

    for (var i = 0; i < num_trials; i++) {
      if (i >= n && Math.random() < rep_ratio){
        trial_sequence.push(trial_sequence[i - n]);
      } else {
        const possible_stimuli = stimuli.filter(function(s: any) {
        return (i < n || s!== trial_sequence[i - n]);
        });
        const random_stimulus = jsPsych.randomization.sampleWithoutReplacement(possible_stimuli, 1)[0]; 
        trial_sequence.push(random_stimulus)
      }
    }

    return trial_sequence
  }

export function createTimeline(trial_sequence: any, keyboard_response: string, trial_duration: number, post_trial_gap: number, fixation_duration: number, n: number){

    const timeline: any[] = [];


    for (var i = 0; i < trial_sequence.length; i++) {

        timeline.push({
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<p style="font-size: 48px; color: gray;">+</p>`,
            choices: "NO_KEYS",
            trial_duration: fixation_duration 
        });
      
        timeline.push({
          type: jsPsychHtmlKeyboardResponse, 
          stimulus: `<p style="font-size: 48px;">${trial_sequence[i]}</p>`,
          choices: [keyboard_response], 
          trial_duration: trial_duration, 
          post_trial_gap: post_trial_gap, 
          data: {correct: i >= 2 && trial_sequence[i] === trial_sequence[i-n]}, 
          on_finish: function(data: any) {
            data.correct_response = data.correct && data.response === keyboard_response;
            data.correct_no_response = !data.correct && data.response === null;
          }
        })
      }

      return timeline
}
