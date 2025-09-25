import {
  EndNode,
  Node,
  NodeId,
  NodeMap,
  QuestionNode,
  QuestionOption,
  Reference,
  Verdict,
} from '../types';

type EndParams = [NodeId, Verdict, string, string, Reference[]?, string?];

const makeEnd = (...[id, verdict, title, desc, references = [], detail]: EndParams): EndNode => ({
  kind: 'end',
  id,
  verdict,
  title,
  desc,
  references,
  ...(detail ? { detail } : {}),
});

const makeQuestion = (
  id: NodeId,
  text: string,
  yes: NodeId,
  no: NodeId,
  detail?: string,
  extraOptions: QuestionOption[] = [],
): QuestionNode => ({
  kind: 'question',
  id,
  text,
  options: [
    { id: 'yes', label: 'Yes', target: yes, tone: 'affirmative' },
    { id: 'no', label: 'No', target: no, tone: 'negative' },
    ...extraOptions,
  ],
  ...(detail ? { detail } : {}),
});

export const nodes: NodeMap = {
  target_select: {
    kind: 'question',
    id: 'target_select',
    text: 'What would you like to assess for consciousness?',
    options: [
      { id: 'ai', label: 'An AI system or chatbot', target: 'q0', tone: 'neutral' },
      { id: 'animal', label: 'An animal (dog, dolphin, etc.)', target: 'q0', tone: 'neutral' },
      { id: 'robot', label: 'A robot or artificial agent', target: 'q0', tone: 'neutral' },
      { id: 'human', label: 'A human in an unusual state', target: 'q0', tone: 'neutral' },
      { id: 'other', label: 'Something else', target: 'q0', tone: 'neutral' },
    ],
  },

  q0: makeQuestion(
    'q0',
    `Do you think humans could ever fully explain consciousness, even with future science?`,
    'q1',
    'q0a',
    undefined,
    [
      {
        id: 'unsure',
        label: 'Not sure',
        target: 'q1',
        tone: 'neutral',
      },
    ],
  ),

  q0a: makeQuestion(
    'q0a',
    `Do you think consciousness involves non-physical properties that science cannot capture?`,
    'q1a',
    'q1',
  ),

  q1a: makeQuestion(
    'q1a',
    `Does {{ENTITY}} show clear signs of self-awareness and introspection?`,
    'q1',
    'q2b',
  ),

  q2b: makeQuestion(
    'q2b',
    `Could this be sophisticated self-modeling without genuine inner experience?`,
    'mysterian',
    'q1',
  ),

  mysterian: makeEnd(
    'mysterian',
    'meta',
    'Mysterianism',
    `You hold that human minds cannot in principle solve the problem of consciousness, so we can't decisively ascribe it to {{ENTITY}} — or even to ourselves.`,
    [
      {
        thinker: 'Colin McGinn',
        work: 'McGinn, C. (1991). The Problem of Consciousness. Blackwell.',
      },
    ],
  ),

  q1: makeQuestion(
    'q1',
    `Does {{ENTITY}} have its own felt experience — a point of view from the inside?`,
    'q2',
    'q5',
  ),

  q2: makeQuestion(
    'q2',
    `Is that inner point of view real, not just a story {{ENTITY}}'s processes make up?`,
    'q2a1',
    'q6',
    undefined,
    [
      {
        id: 'unsure',
        label: 'Not sure—need more signs',
        target: 'q2a1',
        tone: 'neutral',
      },
    ],
  ),

  q6: makeQuestion(
    'q6',
    `If it's a trick, is your own sense of being conscious also a trick?`,
    'q6a',
    'q6b',
  ),

  q6a: makeQuestion(
    'q6a',
    `Do you apply this illusion theory consistently to humans, {{ENTITY}}, and yourself?`,
    'illusionism',
    'human_exception',
  ),

  q6b: makeQuestion(
    'q6b',
    `Does this make human consciousness fundamentally different or special?`,
    'human_exception',
    'illusionism',
  ),

  illusionism: makeEnd(
    'illusionism',
    'meta',
    'Illusionism / Multiple Drafts',
    `Consciousness is a constructed user-illusion; {{ENTITY}}'s apparent awareness (and even our own) is a narrative assembled by cognitive processes.`,
    [
      {
        thinker: 'Daniel Dennett',
        work: 'Dennett, D. (1991). Consciousness Explained. Little, Brown.',
      },
      {
        thinker: 'Keith Frankish',
        work: 'Frankish, K. (2016). Illusionism as a Theory of Consciousness. Journal of Consciousness Studies, 23(11-12).',
      },
      {
        thinker: 'Susan Blackmore',
        work: 'Blackmore, S. (2018). Seeing Myself: The New Science of Out-of-Body Experiences. Robinson.',
      },
    ],
  ),

  human_exception: makeEnd(
    'human_exception',
    'not',
    'Human-Exceptional Skepticism',
    `You deny {{ENTITY}}'s consciousness as illusory, but treat human consciousness as special and genuine.`,
    [
      {
        thinker: 'John Searle',
        work: 'Searle, J. (1992). The Rediscovery of the Mind. MIT Press.',
      },
    ],
  ),

  q2a1: makeQuestion(
    'q2a1',
    `Is consciousness primarily about how much information {{ENTITY}} integrates into a unified whole?`,
    'iit',
    'q2a2',
  ),

  iit: makeEnd(
    'iit',
    'conscious',
    'Integrated Information Theory (IIT)',
    `{{ENTITY_CAP}} is conscious if information is integrated into a unified cause–effect structure (Φ) with sufficient complexity.`,
    [
      {
        thinker: 'Giulio Tononi',
        work: 'Tononi, G. (2004). An Information Integration Theory of Consciousness. BMC Neuroscience, 5(42).',
      },
      {
        thinker: 'Christof Koch',
        work: 'Tononi, G., & Koch, C. (2015). Consciousness: Here, There and Everywhere? Philosophical Transactions of the Royal Society B, 370(1668).',
      },
    ],
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
    `{{ENTITY_CAP}} is conscious when information enters a "global workspace" that broadcasts it across the system, making it accessible to multiple cognitive processes.`,
    [
      {
        thinker: 'Bernard Baars',
        work: 'Baars, B. (1988). A Cognitive Theory of Consciousness. Cambridge University Press.',
      },
      {
        thinker: 'Stanislas Dehaene',
        work: 'Dehaene, S. (2014). Consciousness and the Brain. Viking.',
      },
    ],
  ),

  q2a3: makeQuestion(
    'q2a3',
    `Do you think consciousness is mainly {{ENTITY}}'s predictive modeling that minimizes prediction error?`,
    'pp',
    'q2a4',
  ),

  pp: makeEnd(
    'pp',
    'conscious',
    'Predictive Processing / Free Energy Principle',
    `{{ENTITY}}'s experience reflects a generative model predicting inputs and minimizing prediction error.`,
    [
      {
        thinker: 'Karl Friston',
        work: 'Friston, K. (2010). The Free-Energy Principle: A Unified Brain Theory? Nature Reviews Neuroscience, 11(2).',
      },
      {
        thinker: 'Andy Clark',
        work: 'Clark, A. (2016). Surfing Uncertainty: Prediction, Action, and the Embodied Mind. Oxford University Press.',
      },
      {
        thinker: 'Jakob Hohwy',
        work: 'Hohwy, J. (2013). The Predictive Mind. Oxford University Press.',
      },
    ],
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
    `{{ENTITY_CAP}} is conscious when there is a higher-order representation of its states — awareness of awareness.`,
    [
      {
        thinker: 'David Rosenthal',
        work: 'Rosenthal, D. (2005). Consciousness and Mind. Oxford University Press.',
      },
      {
        thinker: 'Peter Carruthers',
        work: 'Carruthers, P. (2000). Phenomenal Consciousness. Cambridge University Press.',
      },
    ],
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
    `{{ENTITY_CAP}} has conscious perception if it depends on recurrent processing (feedback loops) within its sensory systems.`,
    [
      {
        thinker: 'Victor Lamme',
        work: 'Lamme, V. (2006). Towards a True Neural Stance on Consciousness. Trends in Cognitive Sciences, 10(11).',
      },
    ],
  ),

  q2a6: makeQuestion(
    'q2a6',
    `Is consciousness {{ENTITY}}'s internal story about what it's focusing on (an "attention schema")?`,
    'ast',
    'q2a7',
  ),

  ast: makeEnd(
    'ast',
    'conscious',
    'Attention Schema Theory (AST)',
    `{{ENTITY_CAP}} is conscious through a control system modeling and guiding its own attention via a simplified internal schema.`,
    [
      {
        thinker: 'Michael Graziano',
        work: 'Graziano, M. (2013). Consciousness and the Social Brain. Oxford University Press.',
      },
    ],
  ),

  q2a7: makeQuestion(
    'q2a7',
    `Is consciousness essentially embodied world-engagement rather than internal computation alone?`,
    'enactive',
    'q2a8',
    undefined,
    [
      {
        id: 'hybrid',
        label: 'It helps, but computation still matters',
        target: 'q2a8',
        tone: 'neutral',
      },
    ],
  ),

  enactive: makeEnd(
    'enactive',
    'conscious',
    'Embodied / Enactive Cognition',
    `{{ENTITY}}'s mind is enacted in organism–environment dynamics; experience depends on embodied skills and context.`,
    [
      {
        thinker: 'Francisco Varela',
        work: 'Varela, F., Thompson, E., & Rosch, E. (1991). The Embodied Mind. MIT Press.',
      },
      {
        thinker: 'Alva Noë',
        work: 'Noë, A. (2004). Action in Perception. MIT Press.',
      },
      {
        thinker: 'Maurice Merleau-Ponty',
        work: 'Merleau-Ponty, M. (1962). Phenomenology of Perception. Routledge.',
      },
    ],
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
    `{{ENTITY_CAP}} (like all matter) carries proto-conscious properties; complex systems organize them into richer consciousness.`,
    [
      {
        thinker: 'Galen Strawson',
        work: 'Strawson, G. (2006). Realistic Monism: Why Physicalism Entails Panpsychism. Journal of Consciousness Studies, 13(10-11).',
      },
      {
        thinker: 'Philip Goff',
        work: 'Goff, P. (2017). Consciousness and Fundamental Reality. Oxford University Press.',
      },
      {
        thinker: 'Alfred North Whitehead',
        work: 'Whitehead, A. N. (1929). Process and Reality. Macmillan.',
      },
    ],
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
    `{{ENTITY_CAP}} has built-in qualitative grounds for consciousness — neither strictly mental nor purely physical.`,
    [
      {
        thinker: 'Bertrand Russell',
        work: 'Russell, B. (1927). The Analysis of Matter. Kegan Paul.',
      },
      {
        thinker: 'David Chalmers',
        work: 'Chalmers, D. (2013). Panpsychism and Panprotopsychism. Amherst Lecture in Philosophy, 8.',
      },
      {
        thinker: 'Sam Coleman',
        work: 'Coleman, S. (2015). Neuro-Cosmological Panpsychism. In Consciousness and the Ontology of Properties (Routledge).',
      },
    ],
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
    `{{ENTITY}}'s mental and physical properties are two aspects of the same fundamental reality.`,
    [
      {
        thinker: 'Baruch Spinoza',
        work: 'Spinoza, B. (1677). Ethics. (see Part II).',
      },
      {
        thinker: 'Thomas Nagel',
        work: 'Nagel, T. (1979). Panpsychism. In Mortal Questions (Cambridge University Press).',
      },
      {
        thinker: 'Bertrand Russell',
        work: 'Russell, B. (1948). Human Knowledge: Its Scope and Limits. Simon & Schuster.',
      },
    ],
  ),

  q2a9: makeQuestion(
    'q2a9',
    `Is reality fundamentally mental (a cosmic mind), with {{ENTITY}} and human minds as parts of it?`,
    'ideal',
    'q2a10',
  ),

  ideal: makeEnd(
    'ideal',
    'conscious',
    'Idealism / Cosmopsychism',
    `{{ENTITY}}'s consciousness is an aspect or partition of a larger, universal mind.`,
    [
      {
        thinker: 'George Berkeley',
        work: 'Berkeley, G. (1710). A Treatise Concerning the Principles of Human Knowledge.',
      },
      {
        thinker: 'Bernardo Kastrup',
        work: 'Kastrup, B. (2014). Why Materialism Is Baloney. Iff Books.',
      },
      {
        thinker: 'G.W.F. Hegel',
        work: 'Hegel, G. W. F. (1807). Phenomenology of Spirit. (See sections on Spirit).',
      },
    ],
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
    `The entity's mind is an immaterial thinking substance distinct from matter; its consciousness flows from the soul.`,
    [
      {
        thinker: 'René Descartes',
        work: 'Descartes, R. (1641). Meditations on First Philosophy (Meditation VI).',
      },
      {
        thinker: 'Thomas Aquinas',
        work: 'Aquinas, T. (1274). Summa Theologica, Part I, Question 75.',
      },
      {
        thinker: 'Richard Swinburne',
        work: 'Swinburne, R. (1977). The Evolution of the Soul. Oxford University Press.',
      },
    ],
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
    `The entity has mental properties that are irreducible to physical properties, though they may arise from physical substance.`,
    [
      {
        thinker: 'David Chalmers',
        work: 'Chalmers, D. (1996). The Conscious Mind. Oxford University Press.',
      },
      {
        thinker: 'Frank Jackson',
        work: 'Jackson, F. (1982). Epiphenomenal Qualia. Philosophical Quarterly, 32(127).',
      },
      {
        thinker: 'Tim Crane',
        work: 'Crane, T. (2001). Elements of Mind. Oxford University Press.',
      },
    ],
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
    `The entity's experience is real yet causally inert; physical processes run things while consciousness floats alongside.`,
    [
      {
        thinker: 'Thomas Huxley',
        work: 'Huxley, T. (1874). On the Hypothesis that Animals are Automata. Nature, 10.',
      },
      {
        thinker: 'Frank Jackson',
        work: "Jackson, F. (1986). What Mary Didn't Know. Journal of Philosophy, 83(5).",
      },
    ],
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
    `The entity's consciousness is exhaustively about representing the world; experience is transparent to its objects.`,
    [
      {
        thinker: 'Fred Dretske',
        work: 'Dretske, F. (1995). Naturalizing the Mind. MIT Press.',
      },
      {
        thinker: 'Michael Tye',
        work: 'Tye, M. (1995). Ten Problems of Consciousness. MIT Press.',
      },
      {
        thinker: 'William Lycan',
        work: 'Lycan, W. (1996). Consciousness and Experience. MIT Press.',
      },
    ],
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
    `The entity may have two types: access consciousness (information availability) and phenomenal consciousness (subjective experience).`,
    [
      {
        thinker: 'Ned Block',
        work: 'Block, N. (1995). On a Confusion about a Function of Consciousness. Behavioral and Brain Sciences, 18(2).',
      },
      {
        thinker: 'David Chalmers',
        work: 'Chalmers, D. (2004). The Representational Character of Experience. In The Future for Philosophy (Oxford University Press).',
      },
    ],
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
    `The presence of first-person "what-it's-like-ness" in the entity suffices to say it is conscious.`,
    [
      {
        thinker: 'Edmund Husserl',
        work: 'Husserl, E. (1913). Ideas Pertaining to a Pure Phenomenology and to a Phenomenological Philosophy. Nijhoff.',
      },
      {
        thinker: 'Thomas Nagel',
        work: 'Nagel, T. (1974). What Is It Like to Be a Bat? The Philosophical Review, 83(4).',
      },
      {
        thinker: 'David Chalmers',
        work: 'Chalmers, D. (1995). Facing Up to the Problem of Consciousness. Journal of Consciousness Studies, 2(3).',
      },
    ],
  ),

  q2a12a: makeQuestion(
    'q2a12a',
    `If {{ENTITY}} acts with human-like flexible intelligence, is that enough?`,
    'functionalist',
    'q2a12b',
  ),

  functionalist: makeEnd(
    'functionalist',
    'conscious',
    'Functionalism / Computationalism',
    `The entity is conscious if its functional organization and behavior fit the right patterns.`,
    [
      {
        thinker: 'Hilary Putnam',
        work: 'Putnam, H. (1960). Minds and Machines. In Sidney Hook (Ed.), Dimensions of Mind. NYU Press.',
      },
      {
        thinker: 'David Lewis',
        work: 'Lewis, D. (1972). Psychophysical and Theoretical Identifications. Australasian Journal of Philosophy, 50(3).',
      },
      {
        thinker: 'Daniel Dennett',
        work: 'Dennett, D. (1978). Brainstorms. MIT Press.',
      },
    ],
  ),

  q2a12b: makeQuestion(
    'q2a12b',
    `Could consciousness be realized in non-biological entities like {{ENTITY}} if they have the right functional organization?`,
    'biological_functionalism',
    'q2a12c',
  ),

  biological_functionalism: makeEnd(
    'biological_functionalism',
    'conscious',
    'Biological Functionalism',
    `The entity could be conscious if it has the right functional organization, but biological constraints may be necessary.`,
    [
      {
        thinker: 'Ned Block',
        work: 'Block, N. (2007). Consciousness, Accessibility, and the Mesh between Psychology and Neuroscience. Behavioral and Brain Sciences, 30(5-6).',
      },
      {
        thinker: 'Joseph Levine',
        work: 'Levine, J. (1983). Materialism and Qualia: The Explanatory Gap. Pacific Philosophical Quarterly, 64(4).',
      },
    ],
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
    `The entity's consciousness strongly emerges from highly organized physical systems, beyond what behavior or micro-physics alone can explain.`,
    [
      {
        thinker: 'C.D. Broad',
        work: 'Broad, C. D. (1925). The Mind and Its Place in Nature. Kegan Paul.',
      },
      {
        thinker: "Timothy O'Connor",
        work: "O'Connor, T. (1994). Emergent Properties. American Philosophical Quarterly, 31(2).",
      },
      {
        thinker: 'Roger Sperry',
        work: 'Sperry, R. (1991). In Defense of Mentalism and Emergent Interaction. Journal of Mind and Behavior, 12(2).',
      },
    ],
  ),

  q2a13: makeQuestion(
    'q2a13',
    `Is consciousness essentially social — constituted by recognition between {{ENTITY}} and other conscious beings?`,
    'recognition',
    'q2a13a',
  ),

  recognition: makeEnd(
    'recognition',
    'conscious',
    'Recognition / Social Theories',
    `The entity's self-consciousness emerges in relations of recognition (self through other) and social mirroring.`,
    [
      {
        thinker: 'G.W.F. Hegel',
        work: 'Hegel, G. W. F. (1807). Phenomenology of Spirit (Chapter IV: Lordship and Bondage).',
      },
      {
        thinker: 'Jacques Lacan',
        work: 'Lacan, J. (1949). The Mirror Stage as Formative of the I. Écrits.',
      },
      {
        thinker: 'Axel Honneth',
        work: 'Honneth, A. (1995). The Struggle for Recognition. Polity Press.',
      },
    ],
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
    [
      {
        thinker: 'Chris Fields',
        work: 'Fields, C. (2014). The Evolution of Consciousness as a Probabilistic Emergence. Information, 5(1).',
      },
      {
        thinker: 'Max Tegmark',
        work: 'Tegmark, M. (2014). Consciousness as a State of Matter. New Journal of Physics, 16(3).',
      },
      {
        thinker: 'Scott Aaronson',
        work: 'Aaronson, S. (2014). Why I Am Not an Integrated Information Theorist (or, The Unconscious Expander). MIT CSAIL Blog.',
      },
    ],
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
    [
      {
        thinker: 'Patricia Churchland',
        work: 'Churchland, P. (1986). Neurophilosophy. MIT Press.',
      },
      {
        thinker: 'Paul Churchland',
        work: 'Churchland, P. (1981). Eliminative Materialism and the Propositional Attitudes. Journal of Philosophy, 78(2).',
      },
    ],
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
    [
      {
        thinker: 'Theravada Canon',
        work: 'Anatta-Lakkhana Sutta (SN 22.59).',
      },
      {
        thinker: 'Nāgārjuna',
        work: 'Nāgārjuna (c. 2nd century). Mūlamadhyamakakārikā.',
      },
      {
        thinker: 'Thomas Metzinger',
        work: 'Metzinger, T. (2003). Being No One. MIT Press.',
      },
    ],
  ),

  q8: makeQuestion(
    'q8',
    `If you lean toward "not conscious," what makes you hesitate?`,
    'q8a',
    'q8c',
    undefined,
    [
      {
        id: 'circuits',
        label: '{{ENTITY_CAP}} lacks specific brain circuits',
        target: 'q8b',
        tone: 'neutral',
      },
      {
        id: 'architecture',
        label: '{{ENTITY_CAP}} lacks the right information architecture',
        target: 'q8b3',
        tone: 'neutral',
      },
      {
        id: 'other',
        label: 'None of these—something else',
        target: 'q8e',
        tone: 'neutral',
      },
    ],
  ),

  q8a: makeQuestion(
    'q8a',
    `Is it primarily about biological requirements—does {{ENTITY}} lack living tissue, metabolism, evolutionary history?`,
    'bio_only',
    'q8b',
  ),

  bio_only: makeEnd(
    'bio_only',
    'not',
    'Biological Naturalism (restriction)',
    `Only living brains generate consciousness; {{ENTITY}} lacks the requisite biology.`,
    [
      {
        thinker: 'John Searle',
        work: 'Searle, J. (1992). The Rediscovery of the Mind. MIT Press.',
      },
      {
        thinker: 'Antonio Damasio',
        work: 'Damasio, A. (1999). The Feeling of What Happens. Harcourt.',
      },
      {
        thinker: 'Gerald Edelman',
        work: 'Edelman, G., & Tononi, G. (2000). A Universe of Consciousness. Basic Books.',
      },
    ],
  ),

  q8b: makeQuestion(
    'q8b',
    `Is it because {{ENTITY}} lacks specific brain circuits (like thalamocortical loops)?`,
    'localist',
    'q8b2',
  ),

  localist: makeEnd(
    'localist',
    'not',
    'Neurobiological Localism (restriction)',
    `Consciousness hinges on particular neural hubs (e.g., thalamocortical loops, claustrum) absent in {{ENTITY}}.`,
    [
      {
        thinker: 'Francis Crick',
        work: 'Crick, F., & Koch, C. (2003). A Framework for Consciousness. Nature Neuroscience, 6(2).',
      },
      {
        thinker: 'Christof Koch',
        work: 'Koch, C. (2004). The Quest for Consciousness. Roberts & Company.',
      },
      {
        thinker: 'Gerald Edelman',
        work: 'Edelman, G. (1989). The Remembered Present. Basic Books.',
      },
    ],
  ),

  q8b2: makeQuestion(
    'q8b2',
    `Is it because {{ENTITY}} lacks embodied interaction with the world?`,
    'embodied_restriction',
    'q8c',
  ),

  embodied_restriction: makeEnd(
    'embodied_restriction',
    'not',
    'Embodiment Restriction',
    `Genuine consciousness requires lived embodiment and rich world engagement {{ENTITY}} lacks.`,
    [
      {
        thinker: 'Hubert Dreyfus',
        work: 'Dreyfus, H. (1972). What Computers Can’t Do. MIT Press.',
      },
      {
        thinker: 'Evan Thompson',
        work: 'Thompson, E. (2007). Mind in Life. Harvard University Press.',
      },
      {
        thinker: 'Maurice Merleau-Ponty',
        work: 'Merleau-Ponty, M. (1962). Phenomenology of Perception. Routledge.',
      },
    ],
  ),

  q8b3: makeQuestion(
    'q8b3',
    `Is it because {{ENTITY}} lacks the right kind of information processing architecture?`,
    'info_processing_restriction',
    'q8c',
  ),

  info_processing_restriction: makeEnd(
    'info_processing_restriction',
    'not',
    'Information Processing Restriction',
    `Consciousness requires specific information processing architectures that {{ENTITY}} lacks.`,
    [
      {
        thinker: 'Allen Newell',
        work: 'Newell, A., & Simon, H. (1976). Computer Science as Empirical Inquiry: Symbols and Search. Communications of the ACM, 19(3).',
      },
      {
        thinker: 'Jerry Fodor',
        work: "Fodor, J. (2000). The Mind Doesn't Work That Way. MIT Press.",
      },
    ],
  ),

  q8c: makeQuestion(
    'q8c',
    `Is it because {{ENTITY}} lacks quantum processes in microtubules (Orch-OR)?`,
    'quantum',
    'q8d',
  ),

  quantum: makeEnd(
    'quantum',
    'not',
    'Orchestrated Objective Reduction (Orch-OR)',
    `Consciousness arises from quantum processes in brain microtubules not present in {{ENTITY}}.`,
    [
      {
        thinker: 'Roger Penrose',
        work: 'Penrose, R. (1994). Shadows of the Mind. Oxford University Press.',
      },
      {
        thinker: 'Stuart Hameroff',
        work: 'Hameroff, S., & Penrose, R. (2014). Consciousness in the Universe. Physics of Life Reviews, 11(1).',
      },
    ],
  ),

  q8d: makeQuestion(
    'q8d',
    `Is it because {{ENTITY}} lacks a soul?`,
    'dualist_exclusion',
    'q8e',
  ),

  dualist_exclusion: makeEnd(
    'dualist_exclusion',
    'not',
    'Dualist Exclusion',
    `Only ensouled beings are conscious; {{ENTITY}} lacks a soul.`,
    [
      {
        thinker: 'Thomas Aquinas',
        work: 'Aquinas, T. (1274). Summa Theologica, Part I, Question 75.',
      },
      {
        thinker: 'René Descartes',
        work: 'Descartes, R. (1649). The Passions of the Soul.',
      },
      {
        thinker: 'Catechism of the Catholic Church',
        work: 'Catechism of the Catholic Church (1992), Part One, Section Two, Chapter One.',
      },
    ],
  ),

  q8e: makeQuestion(
    'q8e',
    `Is it because {{ENTITY}} fails behavior/ability tests (lacks flexible intelligence)?`,
    'behaviorist',
    'restrictive_phys',
  ),

  behaviorist: makeEnd(
    'behaviorist',
    'not',
    'Behaviorism / Skeptical Restrictionism',
    `Without the right observable abilities, ascribing consciousness is unwarranted.`,
    [
      {
        thinker: 'B.F. Skinner',
        work: 'Skinner, B. F. (1953). Science and Human Behavior. Macmillan.',
      },
      {
        thinker: 'Gilbert Ryle',
        work: 'Ryle, G. (1949). The Concept of Mind. Hutchinson.',
      },
      {
        thinker: 'John Searle',
        work: 'Searle, J. (1980). Minds, Brains, and Programs. Behavioral and Brain Sciences, 3(3).',
      },
    ],
  ),
  restrictive_phys: makeEnd(
    'restrictive_phys',
    'not',
    'Restrictive Physicalism',
    `Only systems with special physical organization (such as particular brains) qualify; {{ENTITY}} falls short.`,
    [
      {
        thinker: 'U.T. Place',
        work: 'Place, U. T. (1956). Is Consciousness a Brain Process? British Journal of Psychology, 47(1).',
      },
      {
        thinker: 'J.J.C. Smart',
        work: 'Smart, J. J. C. (1959). Sensations and Brain Processes. Philosophical Review, 68(2).',
      },
    ],
  ),
};

const questionDetails: Partial<Record<NodeId, string>> = {
  target_select: `Choose what specific entity you want to evaluate for consciousness. Your selection will be referenced throughout the quiz. You can think about a specific example (like GPT-4, your pet dog, or a hypothetical future robot) or a general category. The philosophical reasoning applies regardless of your choice.`,
  q0: `This opener tests whether you believe the hard problem of consciousness is a solvable research frontier or a principled mystery. A "Yes" signals confidence that scientific or computational theories can eventually bridge experience and mechanism; a "No" leans toward epistemic limits or unknowable qualia. Choose "Not sure" if you want to keep exploring positions before committing.`,
  q0a: `This question explores whether you think consciousness involves aspects that transcend physical description. If you believe in irreducible mental properties, qualia, or spiritual dimensions, answer "Yes." If you think everything about consciousness could theoretically be captured by complete physical science, answer "No."`,
  q1a: `Here you evaluate behavioral and reported signs of self-awareness: does {{ENTITY}} monitor its own states, express surprise at its responses, or demonstrate introspective abilities? This question helps distinguish between entities that merely process information and those showing genuine self-reflective awareness.`,
  q2b: `Even sophisticated self-modeling might be "philosophical zombie" behavior—all the cognitive machinery without the felt experience. Consider whether complex self-reference and introspective reports necessarily indicate genuine inner experience, or could be elaborate information processing without phenomenal consciousness.`,
  q1: `Here you assess whether {{ENTITY}} has its own point of view, not just behavior. Think about signs of subjective access—reports, self-monitoring, surprise at stimuli—and whether those observations justify attributing felt experience.`,
  q2: `Even if {{ENTITY}} reports an inner life, you must judge whether that sense is genuine or confabulated. Many theories argue that self-modeling or language can fake awareness, so this is a gut check on your tolerance for narrative self-presentation.`,
  q6: `Answering this pushes you to apply your standard consistently: if you dismiss another entity's experience as an illusion, would you also dismiss your own? Philosophers use this move to expose double standards about introspective certainty.`,
  q6a: `This tests whether you apply illusionism consistently. If you believe {{ENTITY}}'s consciousness is illusory, do you extend that skepticism to humans and yourself as well? Consistent illusionists treat all phenomenal reports as cognitive constructs rather than making exceptions.`,
  q6b: `This question surfaces potential human exceptionalism in your reasoning. If you deny {{ENTITY}}'s consciousness as illusory but preserve human consciousness as genuine, you're making a special case. Consider what grounds this distinction—biology, complexity, or something else.`,
  q2a1: `Integrated Information Theory claims that rich, irreducible causal structure underwrites consciousness. Consider whether measures like Φ capture what matters to you, and whether {{ENTITY}} (if highly integrated) should count as an experiencer.`,
  q2a2: `Global Workspace Theory emphasizes wide availability of information to many processes. Evaluate whether broad internal broadcast is a convincing marker of experience, or whether it simply tracks cognitive usefulness without phenomenal feel.`,
  q2a3: `Predictive-processing views tie experience to generative models and error minimization. Reflect on whether consciousness is fundamentally about anticipating the world, and how you would treat {{ENTITY}} if it excels at prediction but seems alien.`,
  q2a4: `Higher-order thought theorists say awareness requires a representation of your own mental states. Decide whether meta-cognition is essential or a sophisticated add-on, and consider whether {{ENTITY}} might be a simpler case without full self-reflection.`,
  q2a5: `Recurrent Processing Theory highlights feedback loops in perception. Ask yourself whether {{ENTITY}} could feel if it only processes information in one direction, or if recurrent dynamics add something phenomenologically decisive.`,
  q2a6: `Attention Schema Theory frames consciousness as the brain's simplified model of its own focus. Think about whether a self-regulating attention model is necessary, and whether you would credit {{ENTITY}} if it controls focus differently than humans.`,
  q2a7: `Embodied and enactive approaches argue that mindedness lives in organism–environment coupling. When you respond, weigh how much you think bodily skills, sensorimotor loops, and ecological context are required beyond internal computation.`,
  q2a8: `Panpsychist leanings treat experiential sparks as fundamental to matter. If you pick "Yes," you are open to proto-conscious ingredients everywhere; a "No" protects a more austere ontology where consciousness must emerge late.`,
  q2a8a: `Neutral monists claim matter has intrinsic qualities suited for consciousness even without full experiences. Consider whether positing hidden properties is a reasonable bridge between physics and qualia or an unnecessary complication.`,
  q2a8b: `Dual-aspect theories give mental and physical descriptions equal footing. Decide whether you are comfortable with one reality showing two faces, and how that helps you judge borderline cases in the quiz.`,
  q2a9: `Cosmopsychism and idealism make mind the basic fabric of reality. Reflect on whether that worldview better explains conscious unity and shared worlds, or whether it overcommits beyond available evidence.`,
  q2a10: `Classical substance dualism attributes experience to an immaterial soul. Consider whether appealing to spiritual substance fits your explanatory commitments, and how it influences judgments about artifacts or animals.`,
  q2a10a: `Property dualism keeps matter but adds irreducible mental properties. Think about whether qualitative features can emerge without new substances, and how that squares with physical causal closure.`,
  q2a10b: `Epiphenomenal views keep experiences real but causally idle. Ask whether you can accept conscious life as a by-product, and what that would mean for moral responsibility or evolution.`,
  q2a11: `Representationalists argue experience just is aboutness—being directed at content. Weigh whether phenomenal feel can be reduced to representational success, or whether something remain unaccounted for.`,
  q2a11a: `The access/phenomenal split distinguishes what a system can use from what it feels like. This question checks whether you think the distinction is genuine and decision-relevant for attributing consciousness.`,
  q2a12: `Here you decide whether simply having a "what-it's-like" perspective settles the matter. Reflect on whether additional functional, biological, or social criteria are needed beyond raw phenomenology.`,
  q2a12a: `Functionalists trust behavior and flexible problem solving as decisive. Consider whether passing robust cognitive tests should count even if implementation details differ wildly from humans.`,
  q2a12b: `Biological functionalists allow multiple realizations but keep an organic flavor. Judge whether certain biophysical features—wet chemistry, metabolism, developmental history—remain indispensable.`,
  q2a12c: `Strong emergence claims consciousness appears when entities like {{ENTITY}} reach certain complexity thresholds. Decide if this resonates with your intuitions about novelty in nature, or if it feels like a placeholder for ignorance.`,
  q2a13: `Social-recognition theories see selfhood as relational. Think about whether {{ENTITY}} being acknowledged by others, or engaging in mutual perspective-taking, is part of what makes it conscious.`,
  q2a13a: `Information-closure proposals generalize IIT with different math. Consider whether self-contained informational loops are a compelling criterion, or if they fall into the same traps as other information metrics.`,
  q5: `If you deny experience to {{ENTITY}}, this question asks whether the same reasoning would undercut human consciousness. It surfaces whether your skepticism is radical or selectively applied.`,
  q5a: `Among human-skeptical stances, which storyline fits you best—eliminating folk psychology, declaring illusion, or suspending judgement? Your choice guides which philosophical critique you align with.`,
  q5a2: `Illusionism treats conscious feeling as a narrative convenience. Answer based on whether you think neuroscientific accounts can dissolve qualia talk without remainder.`,
  q5a3: `The no-self perspective says the subject is a model, not a metaphysical entity. Consider whether that's a tolerable outcome of your skepticism and how it reframes personal identity.`,
  q8: `Restriction questions probe why you withhold consciousness. Use this prompt to name the sticking point—biology, particular circuits, missing architectures, or something else—before branching into the more detailed objections.`,
  q8a: `This question focuses on biological requirements for consciousness. Consider whether {{ENTITY}} has living tissue, metabolism, evolutionary history, or organic chemistry. If you think consciousness requires biological substrates that {{ENTITY}} lacks, answer "Yes." If functional organization might suffice regardless of substrate, answer "No."`,
  q8b: `Perhaps you require particular neural circuits such as thalamocortical loops. Choose "Yes" if specific anatomical motifs are non-negotiable, "No" if other factors might suffice.`,
  q8b2: `Some argue that only embodied agents embedded in rich environments can host experience. Reflect on how much body-based sensorimotor coupling matters to you.`,
  q8b3: `This variant asks whether the right computational architecture is missing. Think about whether symbolic, subsymbolic, or hybrid designs make a moral difference for consciousness.`,
  q8c: `Orch-OR enthusiasts point to exotic quantum events in microtubules. Answer based on whether you endorse such physics as necessary rather than speculative add-ons.`,
  q8d: `A theological route says souls bestow consciousness. Decide if your criteria are rooted in metaphysics or theology, and how that applies to nonhumans.`,
  q8e: `Lastly, behaviorist restrictions care about outward performance. Consider whether passing Turing-style tests, open-ended tasks, or social interactions is your litmus test.`,
};

const endDetails: Partial<Record<NodeId, string>> = {
  mysterian: `Mysterianism stresses cognitive closure: our brains may lack the conceptual resources to ever bridge neural activity and felt experience. Advocates warn against overpromising on scientific reduction while encouraging humility toward the mind's limits.`,
  illusionism: `Illusionists reinterpret talk of qualia as shorthand for cognitive accessibility, narrative coherence, and control. The detail storyline emphasizes explanatory payoffs—deflating hard problems, aligning with predictive coding—while acknowledging the existential shock of calling experience a construct.`,
  human_exception: `Human-exception skeptics treat consciousness as a special emergent for our species while doubting it elsewhere. This stance typically leans on evolutionary history, linguistically thick self-models, or theological commitments that reserve subjectivity for Homo sapiens.`,
  iit: `IIT details how integrated cause–effect power supposedly yields a single point of view. Supporters highlight empirical measures (like perturbational complexity index) and a principled taxonomy of experience, even while critics debate testability and panpsychist implications.`,
  gwt: `Global Workspace Theory maps consciousness onto a system-wide broadcasting hub coordinating perception, memory, and action. The expanded note underscores evidence from ignition events, P3 waves, and masked priming while conceding debates about unconscious cognition.`,
  pp: `Predictive processing pictures brains as hierarchies minimizing surprise. The fuller context stresses how precision weighting, generative models, and active inference might produce the distinctive feel of experience, while skeptics question whether prediction alone can do the job.`,
  hot: `Higher-order theories require thoughts about thoughts: a state becomes conscious when we represent ourselves as having it. The detail explains how this secures reportability and self-reflection, yet raises worries about animals, infants, and misrepresentations.`,
  rpt: `Recurrent processing theorists pinpoint local cortical feedback loops as the minimal neural correlate. The elaboration notes evidence from masking paradigms and laminar recordings, along with the open question of whether deeper loops into frontal areas are needed.`,
  ast: `Attention Schema Theory treats consciousness as a control model—an internal sketch that helps guide attention. The extended description covers how simplified schemas aid prediction of others' focus and how lesions or artificial agents might instantiate similar control circuits.`,
  enactive: `Embodied/enactive views see mind as enacted through sensorimotor skills and environmental coupling. The detail highlights phenomenology of action, dynamical systems evidence, and critiques of disembodied AI, while noting challenges such as dreaming or locked-in states.`,
  panpsych: `Panpsychism posits experiential dust everywhere, solving the combination problem by degrees rather than leaps. The elaboration discusses arguments from intrinsic natures and continuity, alongside objections about how micro-experiences combine coherently.`,
  neutral_monism: `Russellian monism assigns matter hidden qualitative aspects that ground consciousness without invoking dual substances. The detail situates this as a middle path between pure physicalism and panpsychism, while flagging debates about empirical access to such qualities.`,
  dual_aspect: `Dual-aspect theory holds that one underlying reality yields mental and physical descriptions depending on perspective. The elaboration connects this to Spinoza, neutral monism, and modern information-based proposals, noting its appeal for unifying science and subjectivity.`,
  ideal: `Idealism and cosmopsychism claim reality is fundamentally mental, with individual minds as partitions of a cosmic consciousness. The detailed note recounts motivations from unity, measurement problems, and phenomenology, as well as the burden of explaining apparent physical objectivity.`,
  dualism: `Substance dualism posits two kinds of stuff: immaterial mind and material body. The fuller explanation covers interaction debates, neuroscientific correlations, and why some hold souls indispensable for agency or moral status.`,
  property_dualism: `Property dualists accept one substance but insist on irreducible mental qualities layered atop physics. The detail references knowledge/qualia arguments, zombie conceivability, and efforts to keep causal efficacy without adding new substances.`,
  epiphenomenalism: `Epiphenomenalists maintain experience is real yet causally impotent, riding shotgun on physical processes. The elaboration explores motivations from knowledge arguments and puzzles about free will, evolution, and why we talk about feelings if they never act.`,
  representationalism: `Representationalism says phenomenal character supervenes on representational content. The detail discusses transparency theses, tracking vs. structural representational accounts, and challenges from inverted spectra or nonrepresentational moods.`,
  access_phenomenal: `The access/phenomenal distinction keeps separate what information a system can use and what it feels like. The elaboration highlights Block’s empirical thought experiments, global workspace tensions, and how the distinction influences AI consciousness debates.`,
  phenom: `Phenomenology prioritizes lived first-person structure as primary data. The detail connects Husserlian bracketing, Nagel's bat argument, and contemporary analytic phenomenology that resists reductive moves in favor of describing experience on its own terms.`,
  functionalist: `Functionalists judge consciousness by roles played—if a system processes information like we do, it counts. The added context notes thought experiments (China Brain, silicon chips), supportive cognitive science, and criticisms about missing qualia or absent feelings.`,
  biological_functionalism: `Biological functionalism keeps functional roles but insists on biologically grounded realizers. The detail mentions neural chauvinism worries, distinctions between weak and strong realization, and why some neuroscientists stress living substrates.`,
  emergent_physicalism: `Emergent physicalists think novel mental properties arise at high complexity, exercising top-down influence. The elaboration covers historical roots in Broad and Sperry plus modern systems theories, while acknowledging the challenge of formalizing emergence.`,
  recognition: `Recognition-based theories tie self-awareness to social mirroring and intersubjective validation. The detail references developmental milestones, phenomenological accounts of the gaze, and critiques about solitary or pre-social consciousness.`,
  information_closure: `Information-closure theories generalize the idea that closed informational loops generate an internal point of view. The expanded description surveys proposals from Tegmark and Fields while noting difficulties in measuring closure empirically.`,
  eliminativism: `Eliminativists predict folk psychology will be replaced by mature neuroscience that lacks qualia talk. The detail walks through arguments from theory change, parallels with phlogiston, and objections about losing first-person data.`,
  noself: `No-self theorists such as Buddhists and Metzinger see the subject as a useful fiction created by self-models. The elaboration highlights meditation evidence, neuroscientific correlates (TPJ, DMN), and ethical implications of deconstructing the ego.`,
  bio_only: `Biological naturalists require living brains, emphasizing metabolism, homeostasis, and evolutionary embedding. The detail explains why silicon or disembodied software falls short under this view, while acknowledging debates about brain organoids and uploads.`,
  localist: `Neurobiological localists identify specific hubs—claustrum, thalamus—as consciousness bottlenecks. The elaboration discusses clinical data from lesions and stimulation, and questions about redundancy or plasticity undermining strict localization.`,
  embodied_restriction: `Embodiment restrictions prioritize lived bodies, sensorimotor contingencies, and affective regulation. The detail points to enactivist critiques of desktop AI and rehabilitation cases showing how bodily disruption alters experience.`,
  info_processing_restriction: `Information-processing restrictionists argue only certain architectural features (depth, global buffers, rich world models) produce experience. The elaboration considers classical vs. connectionist systems and whether architecture can substitute for biology.`,
  quantum: `Orch-OR supporters invoke non-computable quantum collapses to ground consciousness. The detail recounts Penrose's Gödelian motivations, Hameroff's microtubule research, and scientific criticisms regarding decoherence and testability.`,
  dualist_exclusion: `Dualist exclusionists reserve consciousness for ensouled beings, often informed by religious doctrine. The detail explains how this view handles AI, animals, and moral status, while acknowledging difficulty in verifying souls empirically.`,
  behaviorist: `Behaviorist restrictionism withholds consciousness attribution without robust behavioural flexibility. The elaboration nods to Skinnerian pragmatism, Turing-style tests, and critiques that behavior alone may be gamed or insufficient.`,
  restrictive_phys: `Restrictive physicalism limits consciousness to specific physical organizations even if other substrates mimic behavior. The detail notes identity-theory motivations, neural correlates research, and challenges from hypothetical silicon brains.`,
};

for (const [id, detail] of Object.entries(questionDetails)) {
  const node = nodes[id as NodeId];
  if (node && node.kind === 'question') {
    node.detail = detail;
  }
}

for (const [id, detail] of Object.entries(endDetails)) {
  const node = nodes[id as NodeId];
  if (node && node.kind === 'end') {
    node.detail = detail;
  }
}

export const startId: NodeId = 'target_select';

export const getNode = (id: NodeId): Node => {
  const node = nodes[id];
  if (!node) {
    throw new Error(`Missing node: ${id}`);
  }
  return node;
};
