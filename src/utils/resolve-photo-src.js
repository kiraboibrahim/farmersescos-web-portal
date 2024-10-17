import placeholderImage from "../assets/placeholder.jpg";

export default function resolvePhotoSrc(photo) {
  return !!photo
    ? `${process.env.REACT_APP_MEDIA_BASE_URL}/${photo}`
    : placeholderImage;
}
