import {DocumentData, FirestoreDataConverter, getFirestore} from "firebase-admin/firestore";
import {ModelType} from "../types";
import {baseLog} from "../constants";
import _ from 'lodash'
import {notEmpty} from "./utils";

const dLog = baseLog("firestore_converter")

export class ModelTypeConverter<T extends ModelType> implements FirestoreDataConverter<T> {

  //toFirestore(modelObject: T): FirebaseFirestore.DocumentData 
  //toFirestore(modelObject: Partial<T>, options: FirebaseFirestore.SetOptions): FirebaseFirestore.DocumentData;
  toFirestore(modelObject: unknown, options?: unknown): FirebaseFirestore.DocumentData {
    const record = modelObject as T
    const data: DocumentData = _.omit(record, "id")
    if (options && Object.keys(options).length) {
      dLog("options ", options, " not yet implemented")
    }
    return data
  }

  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>): T {
    const record = snapshot.data() as T
    record.id = snapshot.id

    return record
  }
}


export async function getRecord<T extends ModelType>(
  id: string,
  recordType: string,
  parentPath?: string
): Promise<T> {
  const converter = new ModelTypeConverter<T>()
  const path = [parentPath, recordType].filter(notEmpty).join("/")
  const snap = await getFirestore().collection(path).doc(id)
    .withConverter(converter)
    .get()
  const record = snap.data()
  if (!record) throw new Error(`Record not #${id} found`)
  return record as T
}

