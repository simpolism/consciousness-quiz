import { EndNode, Node, NodeId, NodeMap, QuestionNode, Reference, Verdict } from '../types';

type EndParams = [NodeId, Verdict, string, string, Reference[]?];

const makeEnd = (...[id, verdict, title, desc, references = []]: EndParams): EndNode => ({
  kind: 'end',
  id,
  verdict,
  title,
  desc,
  references,
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
    [
      {
        thinker: 'Colin McGinn',
        work: 'McGinn, C. (1991). The Problem of Consciousness. Blackwell.',
      },
    ],
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
    `You deny this object's consciousness as illusory, but treat human consciousness as special and genuine.`,
    [
      {
        thinker: 'John Searle',
        work: 'Searle, J. (1992). The Rediscovery of the Mind. MIT Press.',
      },
    ],
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
    `A mental item is conscious when it enters a "global workspace" that broadcasts it across the system, making it accessible to multiple cognitive processes.`,
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
    `Do you think consciousness is mainly the system's predictive modeling that minimizes prediction error?`,
    'pp',
    'q2a4',
  ),

  pp: makeEnd(
    'pp',
    'conscious',
    'Predictive Processing / Free Energy Principle',
    `Experience reflects a generative model predicting inputs and minimizing prediction error.`,
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
    `A state is conscious when there is a higher-order representation of that state — awareness of awareness.`,
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
    `Conscious perception depends on recurrent cortical processing (feedback loops) within sensory cortices.`,
    [
      {
        thinker: 'Victor Lamme',
        work: 'Lamme, V. (2006). Towards a True Neural Stance on Consciousness. Trends in Cognitive Sciences, 10(11).',
      },
    ],
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
  ),

  enactive: makeEnd(
    'enactive',
    'conscious',
    'Embodied / Enactive Cognition',
    `Mind is enacted in organism–environment dynamics; experience depends on embodied skills and context.`,
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
    `All matter carries proto-conscious properties; complex systems organize them into richer consciousness.`,
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
    `Matter has built-in qualitative grounds for consciousness — neither strictly mental nor purely physical.`,
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
    `Mental and physical are two aspects of the same fundamental reality.`,
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
    `Is reality fundamentally mental (a cosmic mind), with individual minds as parts of it?`,
    'ideal',
    'q2a10',
  ),

  ideal: makeEnd(
    'ideal',
    'conscious',
    'Idealism / Cosmopsychism',
    `Consciousness is fundamental and universal; individual minds are aspects or partitions of a larger mind.`,
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
    `Mind is an immaterial thinking substance distinct from matter; consciousness flows from the soul.`,
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
    `Mental properties are irreducible to physical properties, though they may arise from physical substance.`,
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
    `Experience is real yet causally inert; physical processes run things while consciousness floats alongside.`,
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
    `Consciousness is exhaustively about representing the world; experience is transparent to its objects.`,
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
    `There are two types: access consciousness (information availability) and phenomenal consciousness (subjective experience).`,
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
    `The presence of first-person "what-it's-like-ness" suffices to say a state is conscious.`,
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
    `If a system acts with human-like flexible intelligence, is that enough?`,
    'functionalist',
    'q2a12b',
  ),

  functionalist: makeEnd(
    'functionalist',
    'conscious',
    'Functionalism / Computationalism',
    `Consciousness is as consciousness does: if the functional organization and behavior fit, that suffices.`,
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
    `Could consciousness be realized in non-biological systems if they have the right functional organization?`,
    'biological_functionalism',
    'q2a12c',
  ),

  biological_functionalism: makeEnd(
    'biological_functionalism',
    'conscious',
    'Biological Functionalism',
    `Consciousness requires functional organization that could theoretically be multiply realized but with biological constraints.`,
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
    `Consciousness strongly emerges from highly organized physical systems, beyond what behavior or micro-physics alone can explain.`,
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
    `Is consciousness essentially social — constituted by recognition from/among other subjects?`,
    'recognition',
    'q2a13a',
  ),

  recognition: makeEnd(
    'recognition',
    'conscious',
    'Recognition / Social Theories',
    `Self-consciousness emerges in relations of recognition (self through other) and social mirroring.`,
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
    `Is it because only living biological brains can be conscious?`,
    'bio_only',
    'q8b',
  ),

  bio_only: makeEnd(
    'bio_only',
    'not',
    'Biological Naturalism (restriction)',
    `Only living brains generate consciousness; this object lacks the requisite biology.`,
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
    `Is it because specific brain circuits (like thalamocortical loops) are required?`,
    'localist',
    'q8b2',
  ),

  localist: makeEnd(
    'localist',
    'not',
    'Neurobiological Localism (restriction)',
    `Consciousness hinges on particular neural hubs (e.g., thalamocortical loops, claustrum) absent in the target.`,
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
    `Is it because real consciousness needs an embodied agent interacting with the world?`,
    'embodied_restriction',
    'q8b3',
  ),

  embodied_restriction: makeEnd(
    'embodied_restriction',
    'not',
    'Embodiment Restriction',
    `Genuine consciousness requires lived embodiment and rich world engagement the target lacks.`,
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
    `Is it because the right kind of information processing architecture is missing?`,
    'info_processing_restriction',
    'q8c',
  ),

  info_processing_restriction: makeEnd(
    'info_processing_restriction',
    'not',
    'Information Processing Restriction',
    `Consciousness requires specific information processing architectures that this system lacks.`,
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
    `Is it because quantum processes in microtubules (Orch-OR) are required?`,
    'quantum',
    'q8d',
  ),

  quantum: makeEnd(
    'quantum',
    'not',
    'Orchestrated Objective Reduction (Orch-OR)',
    `Consciousness arises from quantum processes in brain microtubules not present in the target.`,
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
    `Is it because only beings with souls are conscious?`,
    'dualist_exclusion',
    'q8e',
  ),

  dualist_exclusion: makeEnd(
    'dualist_exclusion',
    'not',
    'Dualist Exclusion',
    `Only ensouled beings are conscious; the target lacks a soul.`,
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
    `Is it because it fails behavior/ability tests (no flexible intelligence)?`,
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
    `Only systems with special physical organization (such as particular brains) qualify; the target falls short.`,
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

export const startId: NodeId = 'q0';

export const getNode = (id: NodeId): Node => {
  const node = nodes[id];
  if (!node) {
    throw new Error(`Missing node: ${id}`);
  }
  return node;
};
