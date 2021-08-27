import axios from "axios";
import { observable, action, computed, makeAutoObservable } from "mobx";

class Story {
  images:string[] = [];
  title: string = '';
  description: string = '';
  count: number = 0;
  disabledBack: boolean = true;
  disabledFoward: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  getData = async () => {
    const res = await axios.post("http://localhost:5000/get-data", {count: this.count});
    this.images = []
    if(res.data?.images?.length){
      this.images=res.data.images
    }
    if(res.data?.titles){
      this.title = res.data.titles.header
      this.description = res.data.titles.desc
    }
    console.log(res.data)
    this.disabledBack = res.data.pageBack
    this.disabledFoward = res.data.pageFoward
  }

  setTextOnServ = async (value: string, text:string) => {
    await axios.post("http://localhost:5000/set-title", { value, text })
  }

  setImages (image: string) {
    if(this.images.length === 9){
      return;
    }
    this.images.push(image);
  };

  setTitle (title: string) {
    this.title = title
  }

  setDescription(description: string){
    this.description = description
  }

  deleteImages = async () => {
    await axios.delete("http://localhost:5000/delete-image")
    this.images = []
  }

  changeCount (text: string){
    switch (text){
      case 'back':{
        this.count -= 8
        this.getData()
        break
      }
      case 'foward':{
        this.count +=8
        this.getData()
        break
      }
      case 'home':{
        this.count = 0
        this.getData()
        break
      }
      default: {
        break
      }
    }
  }
}

export default new Story();
