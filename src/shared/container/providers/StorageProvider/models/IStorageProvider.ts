export default interface IStorageProvider {
  saveFile(file: Express.Multer.File): Promise<string>;
}
