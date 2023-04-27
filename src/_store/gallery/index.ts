
import { defineStore } from "pinia";
import pb from '@/services/pb';
import { Collections, ImagesResponse, UsersResponse } from '@/_types/pocketbase-types';
import useUser from '../user';

export type GalleryState = {
  images: ImagesResponse<{ user: UsersResponse; }>[];
  readPage: number;
  totalPages: number;
};

export const useGallery = defineStore("gallery", {
  state: (): GalleryState => ({
    images: [],
    readPage: 1,
    totalPages: 1,
  }),
  actions: {
    async loadGallery(imageToLoad: number = 50) {
      if (this.readPage <= this.totalPages) {
        const result = await pb.collection(Collections.Images).getList<ImagesResponse<{ user: UsersResponse; }>>(this.readPage, imageToLoad, {
          sort: 'created',
          expand: 'user',
        });
        this.images = [...result.items];
        this.totalPages = result.totalPages;
        this.readPage++;
      }
    },
    async uploadImage(file: any,) {
      const userStore = useUser();
      let formData = new FormData();

      // Get image aspect ratio
      let dimensions = new Image();
      let aspectRatio = '';
      dimensions.src = URL.createObjectURL(file);
      dimensions.onload = function () {
        let { width, height }: any = this;

        if (width > height) {
          aspectRatio = `${width / height} / 1`;
        } else {
          aspectRatio = `1 / ${height / width}`;
        }
      };

      console.log(file);

      formData.append('image', file);
      formData.append('user', userStore.getUserId);
      formData.append('title', 'image-name');
      formData.append('aspect_ratio', aspectRatio);

      await pb.collection(Collections.Images).create(formData);
      this.loadGallery();
    }
  },
  getters: {
    getImages(): ImagesResponse<{ user: UsersResponse; }>[] {
      return this.images;
    }
  }
});

export default useGallery;