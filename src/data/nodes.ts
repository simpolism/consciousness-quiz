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
    `Do you think humans could ever fully explain consciousness, even with future science?`,
    'q1',
    'mysterian',
  ),

  mysterian: makeEnd(
    'mysterian',
    'meta',
    'Mysterianism',
    `You hold that human minds cannot in principle solve the problem of consciousness, so we can't decisively ascribe it — even to ourselves.`,
    ['Colin McGinn'],
  ),

  q1: makeQuestion(
    'q1',
    `Does the object have its own felt experience — a point of view from the inside?`,
    'q2',
    'q5',
  ),

  q2: makeQuestion(
    'q2',
    `Is that inner point of view real, not just a story the system's processes make up?`,
    'q2a1',
    'q6',
  ),

  q6: makeQuestion(
    'q6',
    `If it's a trick, is your own sense of being conscious also a trick?`,
    'illusionism',
    'human_exception',
  ),

  illusionism: makeEnd(
    'illusionism',
    'meta',
    'Illusionism / Multiple Drafts',
    `Consciousness is a constructed user-illusion; even our own sense of it is a narrative assembled by cognitive processes.`,
    ['Daniel Dennett', 'Keith Frankish', 'Susan Blackmore'],
  ),

  human_exception: makeEnd(
    'human_exception',
    'not',
    'Human-Exceptional Skepticism',
    `You deny this object's consciousness as illusory, but treat human consciousness as special and genuine.`,
    ['Common skeptical stance; no canonical defender'],
  ),

  q2a1: makeQuestion(
    'q2a1',
    `Is consciousness primarily about how much information a system integrates into a unified whole?`,
    'iit',
    'q2a2',
  ),

  iit: makeEnd(
    'iit',
    'conscious',
    'Integrated Information Theory (IIT)',
    `Consciousness scales with the degree to which information is integrated into a unified cause–effect structure (Φ).`,
    ['Giulio Tononi', 'Christof Koch'],
  ),

  q2a2: makeQuestion(
    'q2a2',
    `Is it mainly about information being shared widely inside the mind so lots of parts can act on it?`,
    'gwt',
    'q2a3',
  ),

  gwt: makeEnd(
    'gwt',
    'conscious',
    'Global Workspace Theory (GWT)',
    `A mental item is conscious when it enters a "global workspace" that broadcasts it across the system, making it accessible to multiple cognitive processes.`,
    ['Bernard Baars', 'Stanislas Dehaene'],
  ),

  q2a3: makeQuestion(
    'q2a3',
    `Do you think consciousness is mainly the system's predictive modeling that minimizes prediction error?`,
    'pp',
    'q2a4',
  ),

  pp: makeEnd(
    'pp',
    'conscious',
    'Predictive Processing / Free Energy Principle',
    `Experience reflects a generative model predicting inputs and minimizing prediction error.`,
    ['Karl Friston', 'Andy Clark', 'Jakob Hohwy'],
  ),

  q2a4: makeQuestion(
    'q2a4',
    `Does being conscious require thoughts about thoughts (higher-order awareness)?`,
    'hot',
    'q2a5',
  ),

  hot: makeEnd(
    'hot',
    'conscious',
    'Higher-Order Thought Theory (HOT)',
    `A state is conscious when there is a higher-order representation of that state — awareness of awareness.`,
    ['David Rosenthal', 'Peter Carruthers'],
  ),

  q2a5: makeQuestion(
    'q2a5',
    `Does being conscious require back-and-forth (feedback) loops in perception, not just one-way input?`,
    'rpt',
    'q2a6',
  ),

  rpt: makeEnd(
    'rpt',
    'conscious',
    'Recurrent Processing Theory (RPT)',
    `Conscious perception depends on recurrent cortical processing (feedback loops) within sensory cortices.`,
    ['Victor Lamme'],
  ),

  q2a6: makeQuestion(
    'q2a6',
    `Is consciousness the system's internal story about what it's focusing on (an "attention schema")?`,
    'ast',
    'q2a7',
  ),

  ast: makeEnd(
    'ast',
    'conscious',
    'Attention Schema Theory (AST)',
    `Consciousness arises from a control system modeling and guiding its own attention via a simplified internal schema.`,
    ['Michael Graziano'],
  ),

  q2a7: makeQuestion(
    'q2a7',
    `Is consciousness essentially embodied world-engagement rather than internal computation alone?`,
    'enactive',
    'q2a8',
  ),

  enactive: makeEnd(
    'enactive',
    'conscious',
    'Embodied / Enactive Cognition',
    `Mind is enacted in organism–environment dynamics; experience depends on embodied skills and context.`,
    ['Francisco Varela', 'Evan Thompson', 'Alva Noë', 'Maurice Merleau-Ponty', 'Martin Heidegger'],
  ),

  q2a8: makeQuestion(
    'q2a8',
    `Do you think experience is a basic property of matter, present everywhere in proto-conscious form?`,
    'panpsych',
    'q2a8a',
  ),

  panpsych: makeEnd(
    'panpsych',
    'conscious',
    'Panpsychism',
    `All matter carries proto-conscious properties; complex systems organize them into richer consciousness.`,
    ['Galen Strawson', 'Philip Goff', 'Alfred North Whitehead'],
  ),

  q2a8a: makeQuestion(
    'q2a8a',
    `Do you think matter has hidden intrinsic qualities that ground consciousness, even if they aren't full experiences?`,
    'neutral_monism',
    'q2a8b',
  ),

  neutral_monism: makeEnd(
    'neutral_monism',
    'conscious',
    'Russellian / Neutral Monism',
    `Matter has built-in qualitative grounds for consciousness — neither strictly mental nor purely physical.`,
    ['Bertrand Russell', 'David Chalmers (Russellian monism)', 'Sam Coleman'],
  ),

  q2a8b: makeQuestion(
    'q2a8b',
    `Does consciousness involve both mental and physical as two aspects of the same underlying reality?`,
    'dual_aspect',
    'q2a9',
  ),

  dual_aspect: makeEnd(
    'dual_aspect',
    'conscious',
    'Dual Aspect Theory',
    `Mental and physical are two aspects of the same fundamental reality.`,
    ['Baruch Spinoza', 'Bertrand Russell', 'Thomas Nagel'],
  ),

  q2a9: makeQuestion(
    'q2a9',
    `Is reality fundamentally mental (a cosmic mind), with individual minds as parts of it?`,
    'ideal',
    'q2a10',
  ),

  ideal: makeEnd(
    'ideal',
    'conscious',
    'Idealism / Cosmopsychism',
    `Consciousness is fundamental and universal; individual minds are aspects or partitions of a larger mind.`,
    ['George Berkeley', 'Bernardo Kastrup', 'G.W.F. Hegel'],
  ),

  q2a10: makeQuestion(
    'q2a10',
    `Does consciousness come from an immaterial soul or spirit?`,
    'dualism',
    'q2a10a',
  ),

  dualism: makeEnd(
    'dualism',
    'conscious',
    'Substance Dualism',
    `Mind is an immaterial thinking substance distinct from matter; consciousness flows from the soul.`,
    ['René Descartes', 'Thomas Aquinas', 'Richard Swinburne'],
  ),

  q2a10a: makeQuestion(
    'q2a10a',
    `Are mental properties distinct from physical properties even if not separate substances?`,
    'property_dualism',
    'q2a10b',
  ),

  property_dualism: makeEnd(
    'property_dualism',
    'conscious',
    'Property Dualism',
    `Mental properties are irreducible to physical properties, though they may arise from physical substance.`,
    ['David Chalmers (naturalistic dualism)', 'Frank Jackson', 'Tim Crane'],
  ),

  q2a10b: makeQuestion(
    'q2a10b',
    `Is conscious experience real but causally inert (doesn't affect physical processes)?`,
    'epiphenomenalism',
    'q2a11',
  ),

  epiphenomenalism: makeEnd(
    'epiphenomenalism',
    'conscious',
    'Epiphenomenalism',
    `Experience is real yet causally inert; physical processes run things while consciousness floats alongside.`,
    ['Thomas Huxley', 'Frank Jackson (early view)'],
  ),

  q2a11: makeQuestion(
    'q2a11',
    `Is consciousness fundamentally about representing or being directed at the world?`,
    'representationalism',
    'q2a11a',
  ),

  representationalism: makeEnd(
    'representationalism',
    'conscious',
    'Representationalism / Intentionalism',
    `Consciousness is exhaustively about representing the world; experience is transparent to its objects.`,
    ['Fred Dretske', 'Michael Tye', 'William Lycan'],
  ),
  q2a11a: makeQuestion(
    'q2a11a',
    `Do you distinguish between access consciousness (available for use) and phenomenal consciousness (what-it's-like)?`,
    'access_phenomenal',
    'q2a12',
  ),

  access_phenomenal: makeEnd(
    'access_phenomenal',
    'conscious',
    'Access/Phenomenal Distinction',
    `There are two types: access consciousness (information availability) and phenomenal consciousness (subjective experience).`,
    ['Ned Block', 'David Chalmers'],
  ),

  q2a12: makeQuestion(
    'q2a12',
    `Is simply there being "what-it's-like-ness" enough to call it conscious?`,
    'phenom',
    'q2a12a',
  ),

  phenom: makeEnd(
    'phenom',
    'conscious',
    'Phenomenology',
    `The presence of first-person "what-it's-like-ness" suffices to say a state is conscious.`,
    ['Edmund Husserl', 'Thomas Nagel', 'David Chalmers'],
  ),

  q2a12a: makeQuestion(
    'q2a12a',
    `If a system acts with human-like flexible intelligence, is that enough?`,
    'functionalist',
    'q2a12b',
  ),

  functionalist: makeEnd(
    'functionalist',
    'conscious',
    'Functionalism / Computationalism',
    `Consciousness is as consciousness does: if the functional organization and behavior fit, that suffices.`,
    ['Hilary Putnam', 'David Lewis', 'Daniel Dennett'],
  ),

  q2a12b: makeQuestion(
    'q2a12b',
    `Could consciousness be realized in non-biological systems if they have the right functional organization?`,
    'biological_functionalism',
    'q2a12c',
  ),

  biological_functionalism: makeEnd(
    'biological_functionalism',
    'conscious',
    'Biological Functionalism',
    `Consciousness requires functional organization that could theoretically be multiply realized but with biological constraints.`,
    ['Ned Block', 'Joseph Levine'],
  ),

  q2a12c: makeQuestion(
    'q2a12c',
    `Does consciousness emerge from complex organization beyond what we can reduce to behavior?`,
    'emergent_physicalism',
    'q2a13',
  ),

  emergent_physicalism: makeEnd(
    'emergent_physicalism',
    'conscious',
    'Emergent Physicalism',
    `Consciousness strongly emerges from highly organized physical systems, beyond what behavior or micro-physics alone can explain.`,
    ['C.D. Broad', "Timothy O'Connor", 'Roger Sperry'],
  ),

  q2a13: makeQuestion(
    'q2a13',
    `Is consciousness essentially social — constituted by recognition from/among other subjects?`,
    'recognition',
    'q2a13a',
  ),

  recognition: makeEnd(
    'recognition',
    'conscious',
    'Recognition / Social Theories',
    `Self-consciousness emerges in relations of recognition (self through other) and social mirroring.`,
    ['G.W.F. Hegel', 'Jacques Lacan', 'Axel Honneth'],
  ),

  q2a13a: makeQuestion(
    'q2a13a',
    `Are there other information-theoretic approaches besides IIT that explain consciousness?`,
    'information_closure',
    'phenom',
  ),

  information_closure: makeEnd(
    'information_closure',
    'conscious',
    'Information Closure Theory',
    `Consciousness arises from informational closure and self-referential processing in complex systems.`,
    ['Chris Fields', 'Max Tegmark', 'Scott Aaronson'],
  ),

  q5: makeQuestion(
    'q5',
    `If it has no inner view, do you think humans also lack real inner experience?`,
    'q5a',
    'q8',
  ),

  q5a: makeQuestion(
    'q5a',
    `Which best fits your stance about humans lacking consciousness?`,
    'eliminativism',
    'q5a2',
  ),

  eliminativism: makeEnd(
    'eliminativism',
    'meta',
    'Eliminativism',
    `Our common-sense mental categories (like "qualia") are errors; the right neuroscience will replace them.`,
    ['Patricia Churchland', 'Paul Churchland'],
  ),

  q5a2: makeQuestion(
    'q5a2',
    `Do you think consciousness is a constructed illusion in humans?`,
    'illusionism',
    'q5a3',
  ),

  q5a3: makeQuestion(
    'q5a3',
    `Do you think the self is a virtual model with no real subject (no-self)?`,
    'noself',
    'mysterian',
  ),

  noself: makeEnd(
    'noself',
    'meta',
    'No-Self (Buddhist / Metzinger)',
    `The "self" is a process without enduring essence; consciousness does not entail a metaphysical subject.`,
    ['Theravada Buddhism', 'Nagarjuna (Mahayana)', 'Thomas Metzinger'],
  ),

  q8: makeQuestion(
    'q8',
    `Is it because only living biological brains can be conscious?`,
    'bio_only',
    'q8b',
  ),

  bio_only: makeEnd(
    'bio_only',
    'not',
    'Biological Naturalism (restriction)',
    `Only living brains generate consciousness; this object lacks the requisite biology.`,
    ['John Searle', 'Antonio Damasio', 'Gerald Edelman'],
  ),

  q8b: makeQuestion(
    'q8b',
    `Is it because specific brain circuits (like thalamocortical loops) are required?`,
    'localist',
    'q8b2',
  ),

  localist: makeEnd(
    'localist',
    'not',
    'Neurobiological Localism (restriction)',
    `Consciousness hinges on particular neural hubs (e.g., thalamocortical loops, claustrum) absent in the target.`,
    ['Francis Crick', 'Christof Koch', 'Gerald Edelman'],
  ),

  q8b2: makeQuestion(
    'q8b2',
    `Is it because real consciousness needs an embodied agent interacting with the world?`,
    'embodied_restriction',
    'q8b3',
  ),

  embodied_restriction: makeEnd(
    'embodied_restriction',
    'not',
    'Embodiment Restriction',
    `Genuine consciousness requires lived embodiment and rich world engagement the target lacks.`,
    ['Hubert Dreyfus', 'Evan Thompson', 'Maurice Merleau-Ponty'],
  ),

  q8b3: makeQuestion(
    'q8b3',
    `Is it because the right kind of information processing architecture is missing?`,
    'info_processing_restriction',
    'q8c',
  ),

  info_processing_restriction: makeEnd(
    'info_processing_restriction',
    'not',
    'Information Processing Restriction',
    `Consciousness requires specific information processing architectures that this system lacks.`,
    ['Cognitive scientists', 'AI researchers'],
  ),

  q8c: makeQuestion(
    'q8c',
    `Is it because quantum processes in microtubules (Orch-OR) are required?`,
    'quantum',
    'q8d',
  ),

  quantum: makeEnd(
    'quantum',
    'not',
    'Orchestrated Objective Reduction (Orch-OR)',
    `Consciousness arises from quantum processes in brain microtubules not present in the target.`,
    ['Roger Penrose', 'Stuart Hameroff'],
  ),

  q8d: makeQuestion(
    'q8d',
    `Is it because only beings with souls are conscious?`,
    'dualist_exclusion',
    'q8e',
  ),

  dualist_exclusion: makeEnd(
    'dualist_exclusion',
    'not',
    'Dualist Exclusion',
    `Only ensouled beings are conscious; the target lacks a soul.`,
    ['Thomas Aquinas', 'René Descartes', 'Religious traditions'],
  ),

  q8e: makeQuestion(
    'q8e',
    `Is it because it fails behavior/ability tests (no flexible intelligence)?`,
    'behaviorist',
    'restrictive_phys',
  ),

  behaviorist: makeEnd(
    'behaviorist',
    'not',
    'Behaviorism / Skeptical Restrictionism',
    `Without the right observable abilities, ascribing consciousness is unwarranted.`,
    ['B.F. Skinner', 'Gilbert Ryle', 'John Searle (Chinese Room)'],
  ),
  restrictive_phys: makeEnd(
    'restrictive_phys',
    'not',
    'Restrictive Physicalism',
    `Only systems with special physical organization (such as particular brains) qualify; the target falls short.`,
    ['Reductive physicalists', 'Type-identity theorists'],
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
