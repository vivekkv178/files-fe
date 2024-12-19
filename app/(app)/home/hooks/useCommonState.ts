import { useEffect, useState } from "react";
import { toast } from "@vivekkv178/library";
import useApi from "@/lib/useApi";
import { BE_ROUTES, HttpMethod } from "@/lib/constants";
import { useAppSelector } from "@/lib/reduxHooks";
import { replaceUrl } from "@vivekkv178/library";
import axios from "axios";
import { useRouter } from "next/navigation";

const useCommonState = () => {
  const authState = useAppSelector((state) => state.auth);
  const api = useApi();
  const router = useRouter();

  const [listLoading, setListLoading] = useState(false);
  const [urlLoading, setUrlLoading] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [mainItems, setMainItems] = useState([]);
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const onFileUpload = async () => {
    if (!file) return;

    setUrlLoading(true);

    try {
      const data = await api.callApi({
        url: replaceUrl(BE_ROUTES.GET_PRE_SIGNED_URL, {
          fileName: file?.name || "",
        }),
        method: HttpMethod.GET,
      });

      const { presignedUrl, guid, s3FileName, fileName } = data;

      setUrlLoading(false);

      setIsUploading(true);
      setUploadProgress(0);

      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1),
          );
          setUploadProgress(progress);
        },
      });

      setIsUploading(false);

      setUrlLoading(true);

      await api.callApi({
        url: BE_ROUTES.ADD_FILE_URL,
        method: HttpMethod.POST,
        data: {
          guid,
          fileName,
          s3FileName,
          size: file.size,
          type: file.type,
        },
      });

      setUrlLoading(false);
      setSuccessDialog(true);
      listData();
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast({
        variant: "destructive",
        title: "Failed to upload.",
        description: error?.response?.data?.message || "",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const dialogCloseHandler = (type: string) => {
    setSuccessDialog(false);
  };

  const listData = async () => {
    try {
      setListLoading(true);
      const data = await api.callApi({
        url: BE_ROUTES.GET_FILES_URL,
        method: HttpMethod.GET,
      });
      setMainItems(data?.files);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error while fetching.",
        description: error?.response?.data?.message || "",
      });
    } finally {
      setListLoading(false);
    }
  };

  /**
   * @TODO
   * This call should happen only once after sign up. Will have to optimize this later.
   */
  const updateUser = async () => {
    const user = authState?.user;
    await api.callApi({
      url: BE_ROUTES.UPDATE_USER_URL,
      method: HttpMethod.POST,
      data: {
        email: user.email,
        firebaseUid: user.uid,
      },
    });
  };

  useEffect(() => {
    if (authState?.user) {
      listData();
      updateUser();
    }
  }, [authState?.user]);

  const refreshHandler = () => {
    listData();
  };

  const redirectHandler = (route: string) => {
    router.push(route);
  };

  return {
    listLoading,
    mainItems,
    uploadProgress,
    isUploading,
    urlLoading,
    successDialog,
    file,
    dialogCloseHandler,
    refreshHandler,
    onFileUpload,
    onFileChange,
    redirectHandler,
  };
};

export default useCommonState;
