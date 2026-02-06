"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";
import data from "../data/cricketers.json";

const ITEMS_PER_PAGE = 12;

export default function AllPlayersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const allPlayers = useMemo(() => {
    const players = [
      ...data.players.batsmen.map((p) => ({ ...p, role: "batsman" })),
      ...data.players.bowlers.map((p) => ({ ...p, role: "bowler" })),
      ...data.players.allrounders.map((p) => ({ ...p, role: "allrounder" })),
    ];

    if (!searchQuery.trim()) return players;

    return players.filter((player) =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const paginatedPlayers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return allPlayers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [allPlayers, currentPage]);

  const totalPages = Math.ceil(allPlayers.length / ITEMS_PER_PAGE);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <Layout
      title="All Indian T20 Players"
      description="Browse all Indian national T20 cricket team players across all roles and positions"
    >
      {/* Page Heading */}
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          All Indian T20 Players
        </h1>
        <p className="text-slate-600">
          Showing {allPlayers.length} player{allPlayers.length !== 1 ? "s" : ""}
        </p>
      </section>

      {/* Search */}
      <section className="mb-8">
        <label htmlFor="search" className="sr-only">
          Search player by name
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search player by name"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
        />
      </section>

      {/* Players Grid */}
      {paginatedPlayers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {paginatedPlayers.map((player) => (
              <Link
                key={player.slug}
                href={`/player/${player.slug}`}
                className="no-underline"
              >
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="relative w-full aspect-square bg-slate-100 flex-shrink-0">
                    <Image
                      src={`/images/${player.role}.jpg`}
                      alt={player.role}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 truncate">
                      {player.name}
                    </h3>
                    <p className="text-xs text-slate-500 capitalize mt-1">
                      {player.role}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mb-8">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
              >
                Previous
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        currentPage === page
                          ? "bg-slate-900 text-white"
                          : "border border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-600 text-lg">
            No players found matching your search.
          </p>
        </div>
      )}
    </Layout>
  );
}
