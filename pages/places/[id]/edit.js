import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "../../../components/Form.js";
import { StyledLink } from "../../../components/StyledLink.js";
import Comments from "../../../components/Comments.js";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: place, isLoading, error, mutate } = useSWR(`/api/places/${id}`);



  async function editPlace(place) {
 
    try {
      const res = await fetch(`/api/places/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(place),
        
      });
     
      if(!res.ok){
        throw new Error("Error occured")
      }

      mutate()
      router.push(`/places/${id}`)
      
        } catch (error) {
            console.log(error)
        }

  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <Link href={`/places/${id}`} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <Form onSubmit={editPlace} formName={'edit-place'} defaultData={place.place} />

      {/* <Comments locationName={data[0]?.name} comments={data[1]} /> */}
      <Comments placeId={id} />
    </>
  );
}
