import { EndNode, Node, NodeId, NodeMap, QuestionNode, Verdict } from '../types';

type EndParams = [NodeId, Verdict, string, string, string[]?];

const makeEnd = (...[id, verdict, title, desc, thinkers = []]: EndParams): EndNode => ({
  kind: 'end',
  id,
  verdict,
  title,
  desc,
  thinkers,
});

const makeQuestion = (id: NodeId, text: string, yes: NodeId, no: NodeId): QuestionNode => ({
  kind: 'question',
  id,
  text,
  yes,
  no,
});

export const nodes: NodeMap = {
  q0: makeQuestion(
    'q0',
    'Do you think the question “What is consciousness?” is, in principle, answerable by humans?',
    'q1',
    'mysterian',
  ),

  mysterian: makeEnd(
    'mysterian',
    'meta',
    'Mysterianism',
    'You hold that human minds cannot in principle solve the problem of consciousness, so we can’t decisively ascribe it — even to ourselves.',
    ['Colin McGinn'],
  ),

  q1: makeQuestion(
    'q1',
    'Does the object have an inner point of view — something it’s like to be it?',
    'q2',
    'q5',
  ),

  q2: makeQuestion(
    'q2',
    'Is that inner point of view real (not a mere trick or illusion)?',
    'q2a1',
    'q6',
  ),

  q6: makeQuestion(
    'q6',
    'If it’s a trick, is your own sense of being conscious also a trick?',
    'illusionism',
    'human_exception',
  ),

  illusionism: makeEnd(
    'illusionism',
    'meta',
    'Illusionism / Multiple Drafts',
    'Consciousness is a constructed user-illusion; even our own sense of it is a brain-made narrative.',
    ['Daniel Dennett', 'Keith Frankish', 'Susan Blackmore'],
  ),

  human_exception: makeEnd(
    'human_exception',
    'not',
    'Human-Exceptional Skepticism',
    'You deny this object’s consciousness as illusory, but treat human consciousness as special and genuine.',
    ['Common skeptical stance; no canonical defender'],
  ),

  q2a1: makeQuestion(
    'q2a1',
    'Is consciousness primarily about how much information a system integrates into a unified whole?',
    'iit',
    'q2a2',
  ),

  iit: makeEnd(
    'iit',
    'conscious',
    'Integrated Information Theory (IIT)',
    'Consciousness scales with the degree to which information is integrated into a unified cause–effect structure (Φ).',
    ['Giulio Tononi', 'Christof Koch'],
  ),

  q2a2: makeQuestion(
    'q2a2',
    'Is it mainly about information being globally broadcast so many subsystems can use it at once?',
    'gwt',
    'q2a3',
  ),

  gwt: makeEnd(
    'gwt',
    'conscious',
    'Global Workspace Theory (GWT)',
    'A mental item is conscious when it enters a “global workspace” that broadcasts it across the system for flexible use.',
    ['Bernard Baars', 'Stanislas Dehaene'],
  ),

  q2a3: makeQuestion(
    'q2a3',
    'Do you think consciousness is mainly the brain’s predictive modeling that minimizes surprise (free energy)?',
    'pp',
    'q2a4',
  ),

  pp: makeEnd(
    'pp',
    'conscious',
    'Predictive Processing / Free Energy Principle',
    'Experience reflects a generative model predicting inputs and minimizing prediction error (surprisal).',
    ['Karl Friston', 'Andy Clark', 'Jakob Hohwy'],
  ),

  q2a4: makeQuestion(
    'q2a4',
    'Does being conscious require thoughts about thoughts (higher-order awareness)?',
    'hot',
    'q2a5',
  ),

  hot: makeEnd(
    'hot',
    'conscious',
    'Higher-Order Thought Theory (HOT)',
    'A state is conscious when there is a higher-order representation of that state — awareness of awareness.',
    [
      'David Rosenthal',
      'Peter Carruthers',
      'Kant (unity of apperception)',
      'Freud (unconscious → conscious)',
    ],
  ),

  q2a5: makeQuestion(
    'q2a5',
    'Does consciousness arise when perception includes recurrent feedback loops (not just feed-forward)?',
    'rpt',
    'q2a6',
  ),

  rpt: makeEnd(
    'rpt',
    'conscious',
    'Recurrent Processing Theory (RPT)',
    'Conscious perception depends on recurrent (feedback) processing within sensory cortices.',
    ['Victor Lamme'],
  ),

  q2a6: makeQuestion(
    'q2a6',
    'Is consciousness the brain’s internal model of its own attention (an “attention schema”)?',
    'ast',
    'q2a7',
  ),

  ast: makeEnd(
    'ast',
    'conscious',
    'Attention Schema Theory (AST)',
    'Consciousness arises from the brain modeling and controlling its own attention via a simplified internal schema.',
    ['Michael Graziano'],
  ),

  q2a7: makeQuestion(
    'q2a7',
    'Is consciousness essentially embodied world-engagement rather than internal computation alone?',
    'enactive',
    'q2a8',
  ),

  enactive: makeEnd(
    'enactive',
    'conscious',
    'Embodied / Enactive Cognition',
    'Mind is enacted in organism–environment dynamics; experience depends on embodied skills and context.',
    ['Francisco Varela', 'Evan Thompson', 'Alva Noë', 'Heidegger (Being-in-the-world)'],
  ),

  q2a8: makeQuestion(
    'q2a8',
    'Do you think experience is a basic property of matter, present in tiny degrees everywhere?',
    'panpsych',
    'q2a9',
  ),

  panpsych: makeEnd(
    'panpsych',
    'conscious',
    'Panpsychism',
    'All matter has proto-experiential aspects; complex systems organize them into richer consciousness.',
    ['Galen Strawson', 'Philip Goff', 'A.N. Whitehead'],
  ),

  q2a9: makeQuestion(
    'q2a9',
    'Is reality fundamentally mental (a cosmic mind), with individual minds as parts of it?',
    'ideal',
    'q2a10',
  ),

  ideal: makeEnd(
    'ideal',
    'conscious',
    'Idealism / Cosmopsychism',
    'Consciousness is fundamental and universal; individual minds are aspects or partitions of a larger mind.',
    ['George Berkeley', 'Bernardo Kastrup', 'Hegel (Spirit/recognition)'],
  ),

  q2a10: makeQuestion(
    'q2a10',
    'Does consciousness come from an immaterial soul or spirit?',
    'dualism',
    'q2a11',
  ),

  dualism: makeEnd(
    'dualism',
    'conscious',
    'Dualism',
    'Mind is an immaterial thinking substance distinct from matter; consciousness flows from the soul.',
    ['René Descartes', 'Thomas Aquinas'],
  ),

  q2a11: makeQuestion(
    'q2a11',
    'Is simply “there being something it’s like” sufficient (regardless of theory)?',
    'phenom',
    'q2a12',
  ),

  phenom: makeEnd(
    'phenom',
    'conscious',
    'Phenomenology',
    'The presence of first-person “what-it’s-like-ness” suffices to say a state is conscious.',
    ['Edmund Husserl', 'Thomas Nagel'],
  ),

  q2a12: makeQuestion(
    'q2a12',
    'If a system behaves like us with rich, flexible intelligence, is that sufficient for consciousness?',
    'functionalist',
    'q2a13',
  ),

  functionalist: makeEnd(
    'functionalist',
    'conscious',
    'Functionalism / Computationalism',
    'Consciousness is as consciousness does: if the functional organization and behavior fit, that suffices.',
    ['Hilary Putnam', 'Marvin Minsky'],
  ),

  q2a13: makeQuestion(
    'q2a13',
    'Is consciousness essentially social — constituted by recognition from/among other subjects?',
    'recognition',
    'phenom',
  ),

  recognition: makeEnd(
    'recognition',
    'conscious',
    'Recognition / Social Theories',
    'Self-consciousness emerges in relations of recognition (self through other) and social mirroring.',
    ['G.W.F. Hegel', 'Jacques Lacan'],
  ),

  q5: makeQuestion(
    'q5',
    'If it has no inner view, do you think humans also lack real inner experience?',
    'q5a',
    'q8',
  ),

  q5a: makeQuestion(
    'q5a',
    'Which best fits your stance about humans lacking consciousness?',
    'eliminativism',
    'q5a2',
  ),

  eliminativism: makeEnd(
    'eliminativism',
    'meta',
    'Eliminativism',
    'Our common-sense mental categories (like “qualia”) are errors; the right neuroscience will replace them.',
    ['Patricia Churchland', 'Paul Churchland'],
  ),

  q5a2: makeQuestion(
    'q5a2',
    'Do you think consciousness is a constructed illusion in humans?',
    'illusionism',
    'q5a3',
  ),

  q5a3: makeQuestion(
    'q5a3',
    'Do you think the self is a virtual model with no real subject (no-self)?',
    'noself',
    'mysterian',
  ),

  noself: makeEnd(
    'noself',
    'meta',
    'No-Self (Buddhist / Metzinger)',
    'The “self” is a process without enduring essence; consciousness does not entail a metaphysical subject.',
    ['Buddhist traditions', 'Thomas Metzinger'],
  ),

  q8: makeQuestion('q8', 'What makes humans conscious but not this object?', 'bio_only', 'q8b'),

  bio_only: makeEnd(
    'bio_only',
    'not',
    'Biological Naturalism (restriction)',
    'Only living brains generate consciousness; this object lacks the requisite biology.',
    ['John Searle', 'Antonio Damasio'],
  ),

  q8b: makeQuestion(
    'q8b',
    'Is it because specific brain circuits (e.g., thalamocortical/claustrum) are required?',
    'localist',
    'q8c',
  ),

  localist: makeEnd(
    'localist',
    'not',
    'Neurobiological Localism (restriction)',
    'Consciousness hinges on particular neural hubs (e.g., thalamocortical loops, claustrum) absent in the target.',
    ['Francis Crick', 'Christof Koch', 'Gerald Edelman'],
  ),

  q8c: makeQuestion(
    'q8c',
    'Is it because quantum brain processes (e.g., Orch-OR) are required?',
    'quantum',
    'q8d',
  ),

  quantum: makeEnd(
    'quantum',
    'not',
    'Quantum Mind (restriction)',
    'Consciousness arises from special quantum phenomena in the brain not present in the target.',
    ['Roger Penrose', 'Stuart Hameroff'],
  ),

  q8d: makeQuestion(
    'q8d',
    'Is it because only beings with souls are conscious?',
    'dualist_exclusion',
    'q8e',
  ),

  dualist_exclusion: makeEnd(
    'dualist_exclusion',
    'not',
    'Dualist Exclusion',
    'Only ensouled beings are conscious; the target lacks a soul.',
    ['Theological traditions'],
  ),

  q8e: makeQuestion(
    'q8e',
    'Is it because it fails strict behavior/ability tests (no rich flexible intelligence)?',
    'behaviorist',
    'restrictive_phys',
  ),

  behaviorist: makeEnd(
    'behaviorist',
    'not',
    'Behaviorism / Skeptical Restrictionism',
    'Without the right observable abilities, ascribing consciousness is unwarranted.',
    ['B.F. Skinner', 'John Searle (Chinese Room critique)'],
  ),

  restrictive_phys: makeEnd(
    'restrictive_phys',
    'not',
    'Restrictive Physicalism',
    'Only systems with special physical organization (typically brains) qualify; the target falls short.',
    ['Contemporary physicalist skeptics'],
  ),
};

export const startId: NodeId = 'q0';

export const getNode = (id: NodeId): Node => {
  const node = nodes[id];
  if (!node) {
    throw new Error(`Missing node: ${id}`);
  }
  return node;
};
