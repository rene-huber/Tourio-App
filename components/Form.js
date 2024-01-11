import styled from "styled-components";
import { StyledButton } from "./StyledButton.js";
import { useState } from "react";

export const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 3px solid black;
  border-radius: 0.5rem;
`;

export const Textarea = styled.textarea`
  font-family: inherit;
  border: 3px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export default function Form({ onSubmit, formName, defaultData }) {
  const [photo, setPhoto] = useState("");
  const [loading, setIsLoading] = useState();
  const [error, setError] = useState();

  console.log(photo);

  const CLOUD_NAME = "huberlin";
  const UPLOAD_PRESET = "blog13";

  const uploadImage = async () => {
    if (!photo) return;
    setIsLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setIsLoading(false);
      setPhoto("")
      return data.secure_url;
    } catch (error) {
      console.error(error);
      setError("Error upload image");
      setIsLoading(false);
      return null;
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const imageUrl = await uploadImage()
    // if (!imageUrl) {
    //   console.error("Failed to upload image.");
    //   return
    // }

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log(data)
    if(imageUrl) {
      data.image = imageUrl
    }
    onSubmit(data);
  }
  console.log(defaultData, "defaultData");
  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        name="name"
        type="text"
        defaultValue={defaultData?.name}
      />
      <Label htmlFor="image-url">Image Url</Label>
      <Input
        id="image-url"
        name="image"
        type="text"
        defaultValue={defaultData?.image}
      />
      <label htmlFor="image">Upload</label>
      <input
        id="image"
        type="file"
        onChange={(event) => event.target ? setPhoto(event.target.files[0]) : null}
      />
      <Label htmlFor="location">Location</Label>
      <Input
        id="location"
        name="location"
        type="text"
        defaultValue={defaultData?.location}
      />
      <Label htmlFor="map-url">Map Url</Label>
      <Input
        id="map-url"
        name="mapURL"
        type="text"
        defaultValue={defaultData?.mapURL}
      />
      <Label htmlFor="description">Description</Label>
      <Textarea
        name="description"
        id="description"
        cols="30"
        rows="10"
        defaultValue={defaultData?.description}
      ></Textarea>
      <StyledButton type="submit">
        {defaultData ? "Update place" : "Add place"}
      </StyledButton>
    </FormContainer>
  );
}
