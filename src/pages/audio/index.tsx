import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Card } from "react-bootstrap";
import DisplayWave from '../../components/wavesurfer/wavesurfer.component';

export interface IAudio {
    audioId: string;
    fileName: string;
    audioData: Int32Array;
}

function Audio({
    data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <h1>Audio</h1>
            {   
                data?.map(({ audioId, fileName, audioData }: IAudio, index: number) => {
                    return (
                        <DisplayWave audioId={audioId} fileName={fileName} audioData={audioData}/>
                    )
            })}
        </>
    )
}

export const getServerSideProps = (async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/audios`,
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
    data: Array<IAudio>
}>;

export default Audio;