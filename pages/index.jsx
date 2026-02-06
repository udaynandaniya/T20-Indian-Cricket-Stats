"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";
import data from "../data/cricketers.json";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const allPlayers = useMemo(() => {
    const players = [
      ...data.players.batsmen,
      ...data.players.bowlers,
      ...data.players.allrounders,
    ];

    if (!searchQuery.trim()) return players;

    return players.filter((player) =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const roles = [
    {
      name: "batsman",
      description: "Opening and middle-order batting specialists",
      image: "/images/batsman.jpg",
    },
    {
      name: "bowler",
      description: "Fast and spin bowling experts",
      image: "/images/bowler.jpg",
    },
    {
      name: "allrounder",
      description: "Versatile players contributing with bat and ball",
      image: "/images/allrounder.jpg",
    },
  ];

  return (
    <Layout
      title="T20 Indian Cricket Stats - Home"
      description="Comprehensive statistics and information about Indian T20 cricketers"
    >
      {/* Hero Section */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg p-12 md:p-16 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            T20 Indian Cricket Stats
          </h1>
          <p className="text-lg md:text-xl text-slate-300 text-balance">
            Explore comprehensive statistics and performance metrics of Indian
            national T20 cricket team players across all roles.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="mb-12">
        <div>
          <label htmlFor="search" className="sr-only">
            Search player by name
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search player by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>
        {searchQuery && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-6">
              Search Results{" "}
              <span className="text-slate-600">
                ({allPlayers.length} player{allPlayers.length !== 1 ? "s" : ""})
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {allPlayers.map((player) => {
                const roleType = data.players.batsmen.some(
                  (b) => b.slug === player.slug,
                )
                  ? "batsman"
                  : data.players.bowlers.some((b) => b.slug === player.slug)
                    ? "bowler"
                    : "allrounder";

                return (
                  <Link
                    key={player.slug}
                    href={`/player/${player.slug}`}
                    className="no-underline"
                  >
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full">
                      <div className="relative w-full aspect-square bg-slate-100 flex-shrink-0">
                        <Image
                          src={`/images/${roleType}.jpg`}
                          alt={`${player.name} - ${roleType}`}
                          width={350}
                          height={350}
                          priority={false}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 md:p-4 flex-grow flex flex-col">
                        <h3 className="text-base md:text-lg font-semibold text-slate-900">
                          {player.name}
                        </h3>
                        <p className="text-xs md:text-sm text-slate-600 capitalize">
                          {roleType}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Role Cards Section */}
      {!searchQuery && (
        <section>
          <h2 className="text-3xl font-bold mb-8 text-slate-900">
            Explore by Role
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {roles.map((role) => (
              <div
                key={role.name}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col"
              >
                <div className="relative w-full aspect-square bg-slate-100 flex-shrink-0">
                  <Image
                    src={role.image || "/placeholder.svg"}
                    alt={role.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 md:p-6 flex-grow flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold capitalize mb-2 text-slate-900">
                    {role.name}
                  </h3>

                  <p className="text-slate-600 mb-4 md:mb-6 text-sm">
                    {role.description}
                  </p>

                  <Link
                    href={`/players/${role.name}`}
                    className="inline-block bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors no-underline mt-auto"
                  >
                    View Players
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}
