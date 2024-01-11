import styled from "styled-components";
import { FormContainer, Input, Label } from "./Form";
import { StyledButton } from "./StyledButton.js";

import { useRouter } from "next/router.js";
import { mutate } from "swr";


export default function Comments({ locationName, comments }) {
  const Article = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 5px solid black;
    border-radius: 0.8rem;
    padding: 0.5rem;
    text-align: center;
    p {
      border-bottom: solid 1px black;
      padding: 20px;
    }
  `;

  const router = useRouter();
  const { id } = router.query;

  async function handleSubmitComment(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    // onSubmit(data);
    data.placeID = id;

    try {
      const res = await fetch('/api/comments', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });
      if (res.ok) {
        console.log("success" , res.status, data)
        alert("Comment added")
        mutate()
      }
  } catch (error) {
    console.log(error)
      
  }



  }

  return (
    <Article>
      <FormContainer onSubmit={handleSubmitComment}>
        <Label htmlFor="name">Your Name</Label>
        <Input type="text" name="name" placeholder="name" />
        <Label htmlFor="comment">Your Comment</Label>
        <Input type="text" name="comment" placeholder="comment here..." />
        <StyledButton type="submit">Send</StyledButton>
      </FormContainer>
      {comments && comments.length > 0 && (
        <>
          <h1>{comments.length} fans commented on this place:</h1>
          {comments.map(({ name, comment }, idx) => (
            <div key={idx} className="comment">
              <p>
                <small>
                  <strong>{name}</strong> commented on {locationName}
                </small>
              </p>
              <span>{comment}</span>
            </div>
          ))}
        </>
      )}

      
    </Article>
  );
}
