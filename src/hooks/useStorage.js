import { useState, useEffect } from "react";
import { Database } from "../firebase";
export function useStorage(file, folderName) {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!file || folderName === null) return;
    const runFn = () => {
      const storageRef = Database.STORAGE
        .ref()
        .child(`${folderName}/${file.name}`);
      var uploadTask = storageRef.put(file);
      uploadTask.on(
        "state_change",
        (snapshot) => {
          var taskProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(taskProgress);
          console.log(taskProgress);
        },
        (err) => {
          setError(err);
          console.log(err);
        },
        async () => {
          const fileUrl = await uploadTask.snapshot.ref.getDownloadURL();
          setUrl(fileUrl);
        }
      );
    };
    runFn();
  }, [file, folderName]);

  return { progress, url, error};
}
