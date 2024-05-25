import { UserIcon } from "@heroicons/react/20/solid";

export default function ProfilePic(props: { imageUrl: string | null }) {
    let imageUrl = props.imageUrl;
    return <div className="w-14">
        {imageUrl && <img className="rounded-full" src={imageUrl} />}
        {!imageUrl && <div className="rounded-full bg-main-gray"><UserIcon /></div>}
    </div>
}