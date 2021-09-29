import { File } from './File';

export interface Folder {
  id: number;

  NameFile: string;

  type: string;

  createBy: string;

  createAt: string;

  modifiedAt: string;

  modifiedBy: string;

  files: Array<File>;

  subfolder: Folder
}
