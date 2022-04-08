class _UploadService {
  public uploadImage(file: File, filename: string): Promise<File> {
    return fetch(`http://localhost:8010/proxy/photo/${filename}`, {
      method: 'PUT',
      body: file
    })
      .then(res => file);
  }
}

export const UploadService = new _UploadService();

