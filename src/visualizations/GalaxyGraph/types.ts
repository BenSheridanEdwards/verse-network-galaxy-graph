export type ServiceKey = string;

export interface Survivor {
  mutator: string;
  line: number;
  replacement: string;
}

export interface MutationStats {
  killed: number;
  survived: number;
  ignored?: number;
  total: number;
  score: number;
  survivors?: Survivor[];
}

export interface MutationData {
  aggregate: { killed: number; survived: number; total: number; score: number };
  services: Record<ServiceKey, MutationStats>;
  endpoints: Record<string, MutationStats & { svc: ServiceKey; fnName?: string }>;
}

export interface NodeNarrative {
  description?: string;
  summary?: string;
  why?: string;
  flow?: string;
  since?: string;
}

export interface ServiceDef {
  id: string;
  svc: ServiceKey;
  file: string;
  narrative?: NodeNarrative;
}

export interface EndpointDef {
  id: string;
  fnName: string;
  noun: string;
  svc: ServiceKey;
  method: string;
  path: string;
  internal?: boolean;
  narrative?: NodeNarrative;
}

export interface TestDef {
  id: string;
  svc: ServiceKey;
  name: string;
  http?: boolean;
  endpoints: string[];
  story?: string;
  category?: string;
}

export interface TopicDef {
  topic: string;
  file: string;
  narrative?: NodeNarrative;
}

export interface ContractTest {
  name: string;
  category?: string;
  story?: string;
}

export type ContractNarrative = NodeNarrative;

export interface ContractSignals {
  idempotent?: boolean;
  auditLogged?: boolean;
}

export interface ContractDef {
  id: string;
  file: string;
  describe: string;
  producer: ServiceKey;
  consumer: ServiceKey;
  mode: "direct-call" | "event-bus";
  topic?: string;
  narrative?: ContractNarrative;
  producerFns: string[];
  consumerFns: string[];
  tests: ContractTest[];
  signals?: ContractSignals;
}

export type NodeKind = "service" | "endpoint" | "test" | "topic" | "bond";

export interface TestRef {
  id: string;
  name: string;
  http: boolean;
  svc: ServiceKey;
}

export interface GraphNode {
  id: string;
  name: string;
  kind: NodeKind;
  svc: ServiceKey;
  val: number;
  color: string;
  file?: string;
  fnName?: string;
  method?: string;
  path?: string;
  internal?: boolean;
  tests?: TestRef[];
  coverage?: number;
  coverageRatio?: number;
  http?: boolean;
  topic?: string;
  topicDef?: TopicDef;
  contract?: ContractDef;
  contracts?: ContractDef[];
  narrative?: NodeNarrative;
  mutation?: MutationStats;
  x?: number;
  y?: number;
  z?: number;
}

export interface GraphLink {
  source: string;
  target: string;
  kind: "contains" | "tests" | "depends" | "publishes" | "consumes";
  cross?: boolean;
  reason?: string;
  contractId?: string;
  mode?: "direct-call" | "event-bus";
}
