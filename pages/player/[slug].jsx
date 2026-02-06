import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';
import data from '../../data/cricketers.json';
import Head from 'next/head';


export default function PlayerProfilePage({ player, role }) {
  if (!player) {
    return (
      <Layout title="Player Not Found">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Player Not Found</h1>
          <Link href="/players" className="text-slate-900 underline hover:no-underline">
            Back to all players
          </Link>
        </div>
      </Layout>
    );
  }

  const title = `${player.name} - T20 Cricket Stats`;
  const description = `${player.name} - Indian T20 ${role} statistics and career information`;

  const playerJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: player.name,
  nationality: 'Indian',
  jobTitle: `T20 Cricket ${role}`,
  description,
  image: `/images/${role}.jpg`,
  memberOf: {
    '@type': 'SportsTeam',
    name: 'Indian National Cricket Team',
    sport: 'Cricket',
  },
};


  return (

    <>
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(playerJsonLd),
        }}
      />
    </Head>
    <Layout title={title} description={description}>
      <div className="mb-8">
        <Link href={`/players/${role}`} className="text-slate-900 hover:text-slate-600 underline">
          ← Back to {role}s
        </Link>
      </div>

      <section className="bg-white border border-slate-200 rounded-lg p-4 md:p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="md:col-span-1">
            <div className="relative w-full aspect-square bg-slate-100 rounded-lg overflow-hidden">
              <Image
                src={`/images/${role}.jpg`}
                alt={`${player.name} - ${role}`}
                width={400}
                height={400}
                priority={true}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">{player.name}</h1>
            <p className="text-xl text-slate-600 capitalize mb-6">{role}</p>

            {role === 'batsman' && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-slate-600">Matches</p>
                  <p className="text-3xl font-bold text-slate-900">{player.matches}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Runs</p>
                  <p className="text-3xl font-bold text-slate-900">{player.runs}</p>
                </div>
              </div>
            )}

            {role === 'bowler' && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-slate-600">Matches</p>
                  <p className="text-3xl font-bold text-slate-900">{player.matches}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Wickets</p>
                  <p className="text-3xl font-bold text-slate-900">{player.wickets}</p>
                </div>
              </div>
            )}

            {role === 'allrounder' && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-slate-600">Matches</p>
                  <p className="text-3xl font-bold text-slate-900">{player.matches}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Runs / Wickets</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {player.runs} / {player.wickets}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Detailed Statistics</h2>

        {role === 'batsman' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Statistic</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-700">Matches Played</td>
                  <td className="py-3 px-4 text-right text-slate-900 font-semibold">{player.matches}</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-700">Total Runs</td>
                  <td className="py-3 px-4 text-right text-slate-900 font-semibold">{player.runs}</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-700">Average</td>
                  <td className="py-3 px-4 text-right text-slate-900 font-semibold">{player.average.toFixed(2)}</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-700">Strike Rate</td>
                  <td className="py-3 px-4 text-right text-slate-900 font-semibold">{player.strikeRate.toFixed(2)}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-700">Highest Score</td>
                  <td className="py-3 px-4 text-right text-slate-900 font-semibold">{player.highestScore}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {role === 'bowler' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Statistic</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-700">Matches Played</td>
                  <td className="py-3 px-4 text-right text-slate-900 font-semibold">{player.matches}</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-700">Wickets Taken</td>
                  <td className="py-3 px-4 text-right text-slate-900 font-semibold">{player.wickets}</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-700">Economy Rate</td>
                  <td className="py-3 px-4 text-right text-slate-900 font-semibold">{player.economy.toFixed(2)}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-700">Best Bowling</td>
                  <td className="py-3 px-4 text-right text-slate-900 font-semibold">{player.bestBowling}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {role === 'allrounder' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Statistic</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-700">Matches Played</td>
                  <td className="py-3 px-4 text-right text-slate-900 font-semibold">{player.matches}</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-700">Total Runs</td>
                  <td className="py-3 px-4 text-right text-slate-900 font-semibold">{player.runs}</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-700">Wickets Taken</td>
                  <td className="py-3 px-4 text-right text-slate-900 font-semibold">{player.wickets}</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-700">Strike Rate</td>
                  <td className="py-3 px-4 text-right text-slate-900 font-semibold">{player.strikeRate.toFixed(2)}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-700">Economy Rate</td>
                  <td className="py-3 px-4 text-right text-slate-900 font-semibold">{player.economy.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Layout>
      </>

  );
}

export async function getStaticProps({ params }) {
  const allPlayers = [
    ...data.players.batsmen.map((p) => ({ ...p, role: 'batsman' })),
    ...data.players.bowlers.map((p) => ({ ...p, role: 'bowler' })),
    ...data.players.allrounders.map((p) => ({ ...p, role: 'allrounder' })),
  ];

  const player = allPlayers.find((p) => p.slug === params.slug);

  if (!player) {
    return { notFound: true };
  }

  return {
    props: {
      player,
      role: player.role,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const allPlayers = [
    ...data.players.batsmen,
    ...data.players.bowlers,
    ...data.players.allrounders,
  ];

  const paths = allPlayers.map((player) => ({
    params: { slug: player.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}
