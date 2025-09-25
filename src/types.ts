export type Verdict = 'conscious' | 'not' | 'meta';

export type NodeId =
  | 'q0'
  | 'mysterian'
  | 'q1'
  | 'q2'
  | 'q6'
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

export interface QuestionNode extends BaseNode {
  kind: 'question';
  text: string;
  yes: NodeId;
  no: NodeId;
}

export interface EndNode extends BaseNode {
  kind: 'end';
  verdict: Verdict;
  title: string;
  desc: string;
  thinkers: string[];
}

export type Node = QuestionNode | EndNode;

export type NodeMap = Record<NodeId, Node>;
