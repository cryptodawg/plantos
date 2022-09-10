import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type PlantMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Plant {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Plant, PlantMetaData>);
  static copyOf(source: Plant, mutator: (draft: MutableModel<Plant, PlantMetaData>) => MutableModel<Plant, PlantMetaData> | void): Plant;
}