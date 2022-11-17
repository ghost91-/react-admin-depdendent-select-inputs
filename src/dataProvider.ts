import fakeDataProvider from "ra-data-fakerest";
import { DataProvider, HttpError } from "react-admin";

type SubCategoryA = "Foo" | "Bar";
type SubCategoryB = "Baz" | "Bam";

export type Record = { id: number } & (
  | { category: "A"; subCategory: SubCategoryA | null }
  | { category: "B"; subCategory: SubCategoryB | null }
);

function isRecord(record: unknown): record is Record {
  if (typeof record !== "object" || record === null) return false;
  if (
    Object.keys(record).find(
      (key) => !["id", "category", "subCategory"].includes(key)
    )
  )
    return false;
  if (!("id" in record && "category" in record && "subCategory" in record))
    return false;
  if (typeof record.id !== "number") return false;
  switch (record.category) {
    case "A": {
      return (["Foo", "Bar", null] as unknown[]).includes(record.subCategory);
    }
    case "B": {
      return (["Baz", "Bam", null] as unknown[]).includes(record.subCategory);
    }
  }
  return false;
}

function validateRecord(record: unknown): asserts record is Record {
  if (!isRecord(record)) {
    throw new HttpError("Invalid record!", 400);
  }
}

const withRecordValidation = <ResourceType extends string = string>(
  dataProvider: DataProvider<ResourceType>
): DataProvider<ResourceType> => {
  return {
    ...dataProvider,
    update: async (resource, params) => {
      console.log(params.data);
      validateRecord(params.data);
      return dataProvider.update(resource, params);
    },
    create: async (resource, params) => {
      validateRecord(params.data);
      return dataProvider.create(resource, params);
    },
  };
};

export const dataProvider = withRecordValidation(
  fakeDataProvider({
    records: [
      { id: 0, category: "A", subCategory: "Foo" },
      { id: 1, category: "B", subCategory: "Bam" },
    ],
  })
);
