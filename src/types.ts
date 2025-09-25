export type Verdict = 'conscious' | 'not' | 'meta';

export type NodeId =
  | 'target_select'
  | 'consciousness_incoherent'
  | 'q0'
  | 'q0a'
  | 'mysterian'
  | 'q1'
  | 'q1a'
  | 'q2'
  | 'q2b'
  | 'q6'
  | 'q6a'
  | 'q6b'
  | 'illusionism'
  | 'human_exception'
  | 'q2a1'
  | 'iit'
  | 'q2a2'
  | 'gwt'
  | 'q2a3'
  | 'pp'
  | 'q2a4'
  | 'hot'
  | 'q2a5'
  | 'rpt'
  | 'q2a6'
  | 'ast'
  | 'q2a7'
  | 'enactive'
  | 'q2a8'
  | 'panpsych'
  | 'q2a8a'
  | 'neutral_monism'
  | 'q2a8b'
  | 'dual_aspect'
  | 'q2a9'
  | 'ideal'
  | 'q2a10'
  | 'dualism'
  | 'q2a10a'
  | 'property_dualism'
  | 'q2a10b'
  | 'epiphenomenalism'
  | 'q2a11'
  | 'representationalism'
  | 'q2a11a'
  | 'access_phenomenal'
  | 'q2a12'
  | 'phenom'
  | 'q2a12a'
  | 'functionalist'
  | 'q2a12b'
  | 'biological_functionalism'
  | 'q2a12c'
  | 'emergent_physicalism'
  | 'q2a13'
  | 'recognition'
  | 'q2a13a'
  | 'information_closure'
  | 'q5'
  | 'q5a'
  | 'eliminativism'
  | 'q5a2'
  | 'q5a3'
  | 'noself'
  | 'q8'
  | 'q8a'
  | 'bio_only'
  | 'q8b'
  | 'localist'
  | 'q8b2'
  | 'embodied_restriction'
  | 'q8b3'
  | 'info_processing_restriction'
  | 'q8c'
  | 'quantum'
  | 'q8d'
  | 'dualist_exclusion'
  | 'q8e'
  | 'behaviorist'
  | 'restrictive_phys';

export interface BaseNode {
  id: NodeId;
  kind: 'question' | 'end';
}

export type QuestionOptionTone = 'affirmative' | 'negative' | 'neutral';

export interface QuestionOption {
  id: string;
  label: string;
  target: NodeId;
  tone?: QuestionOptionTone;
}

export interface QuestionNode extends BaseNode {
  kind: 'question';
  text: string;
  options: QuestionOption[];
  detail?: string;
}

export interface Reference {
  thinker: string;
  work: string;
}

export interface EndNode extends BaseNode {
  kind: 'end';
  verdict: Verdict;
  title: string;
  desc: string;
  references: Reference[];
  detail?: string;
}

export type Node = QuestionNode | EndNode;

export type NodeMap = Record<NodeId, Node>;
