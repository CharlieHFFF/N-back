import { createNbackStim, createTimeline } from './index';
import { initJsPsych, JsPsych } from 'jspsych';

describe('N-back Timeline Package Tests', () => {
  let jsPsych: JsPsych;

  beforeEach(() => {
    jsPsych = initJsPsych();
  });

  describe('createNbackStim', () => {
    it('should generate a sequence of the specified length', () => {
      const num_trials = 10;
      const stimuli = ['A', 'B', 'C'];
      const n = 2;
      const rep_ratio = 0.5;
      
      const sequence = createNbackStim(jsPsych, n, stimuli, num_trials, rep_ratio);
      expect(sequence.length).toBe(num_trials);
    });

    it('should contain repetitions according to the specified n-back rule and rep_ratio', () => {
      const num_trials = 10;
      const stimuli = ['A', 'B', 'C'];
      const n = 2;
      const rep_ratio = 1;  // Ensures repetitions
      
      const sequence = createNbackStim(jsPsych, n, stimuli, num_trials, rep_ratio);
      expect(sequence.slice(n).some((item, i) => item === sequence[i])).toBe(true);
    });
  });

  describe('createTimeline', () => {
    it('should create a timeline with correct trial count', () => {
      const trial_sequence = ['A', 'B', 'C', 'D'];
      const keyboard_response = ' ';
      const trial_duration = 1000;
      const post_trial_gap = 500;
      const fixation_duration = 200;
      const n = 2;
      
      const timeline = createTimeline(trial_sequence, keyboard_response, trial_duration, post_trial_gap, fixation_duration, n);
      expect(timeline.length).toBe(trial_sequence.length);
    });

    it('should have correct configuration for each trial', () => {
      const trial_sequence = ['A'];
      const keyboard_response = ' ';
      const trial_duration = 1000;
      const post_trial_gap = 500;
      const fixation_duration = 200;
      const n = 2;
      
      const timeline = createTimeline(trial_sequence, keyboard_response, trial_duration, post_trial_gap, fixation_duration, n);
      const trial = timeline[0];

      expect(trial.stimulus).toBe(trial_sequence[0]);
      expect(trial.choices).toEqual([keyboard_response]);
      expect(trial.trial_duration).toBe(trial_duration);
      expect(trial.post_trial_gap).toBe(post_trial_gap);
    });
  });
});
