import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Card } from "react-bootstrap";
import DisplayWave from '../../components/wavesurfer/wavesurfer.component';

export interface IAudio {
    audioId: string;
    fileName: string;
    audioData: Int32Array;
}

function Page({
    data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Card style={{ margin: '1rem' }} key={data?.audioId}>
            <Card.Title>{data?.fileName}</Card.Title>
            <DisplayWave audioId={data?.audioId} fileName={data?.fileName} audioData={data?.audioData}/>
        </Card>
    )
}

export const getServerSideProps = (async (context) => {
    const { id } = context.query;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/audios/details/${id}`,
        {
            method: "GET",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            next: { revalidate: 10 }
        }
        );
        const data = await res.json();

    if (!data) {
        return {
          notFound: true,
        }
    }

    return { props: { data }};
}) satisfies GetServerSideProps<{
    data: IAudio
}>;

export default Page;