const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8010/proxy'
  : '';

class _UploadService {
  public uploadImage(file: File, filename: string): Promise<File> {
    return fetch(`${baseUrl}/photo/${filename}`, {
      method: 'PUT',
      body: file
    })
      .then(res => file);
  }
}

export const UploadService = new _UploadService();

