'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';
import data from '../../data/cricketers.json';

const ITEMS_PER_PAGE = 12;

export default function RoleListingPage({ role }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const roleData = useMemo(() => {
    if (role === 'batsman') return data.players.batsmen;
    if (role === 'bowler') return data.players.bowlers;
    if (role === 'allrounder') return data.players.allrounders;
    return [];
  }, [role]);

  const filteredPlayers = useMemo(() => {
    let filtered = [...roleData];

    if (searchQuery.trim()) {
      filtered = filtered.filter((player) =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (role === 'batsman') {
      if (filters.matchesGt !== undefined && filters.matchesGt !== '') {
        filtered = filtered.filter((p) => p.matches > parseInt(filters.matchesGt));
      }
      if (filters.matchesLt !== undefined && filters.matchesLt !== '') {
        filtered = filtered.filter((p) => p.matches < parseInt(filters.matchesLt));
      }
      if (filters.runsGt !== undefined && filters.runsGt !== '') {
        filtered = filtered.filter((p) => p.runs > parseInt(filters.runsGt));
      }
      if (filters.strikeRateGt !== undefined && filters.strikeRateGt !== '') {
        filtered = filtered.filter((p) => p.strikeRate > parseFloat(filters.strikeRateGt));
      }
    } else if (role === 'bowler') {
      if (filters.matchesGt !== undefined && filters.matchesGt !== '') {
        filtered = filtered.filter((p) => p.matches > parseInt(filters.matchesGt));
      }
      if (filters.matchesLt !== undefined && filters.matchesLt !== '') {
        filtered = filtered.filter((p) => p.matches < parseInt(filters.matchesLt));
      }
      if (filters.wicketsGt !== undefined && filters.wicketsGt !== '') {
        filtered = filtered.filter((p) => p.wickets > parseInt(filters.wicketsGt));
      }
      if (filters.economyLt !== undefined && filters.economyLt !== '') {
        filtered = filtered.filter((p) => p.economy < parseFloat(filters.economyLt));
      }
    } else if (role === 'allrounder') {
      if (filters.matchesGt !== undefined && filters.matchesGt !== '') {
        filtered = filtered.filter((p) => p.matches > parseInt(filters.matchesGt));
      }
      if (filters.runsGt !== undefined && filters.runsGt !== '') {
        filtered = filtered.filter((p) => p.runs > parseInt(filters.runsGt));
      }
      if (filters.wicketsGt !== undefined && filters.wicketsGt !== '') {
        filtered = filtered.filter((p) => p.wickets > parseInt(filters.wicketsGt));
      }
      if (filters.strikeRateGt !== undefined && filters.strikeRateGt !== '') {
        filtered = filtered.filter((p) => p.strikeRate > parseFloat(filters.strikeRateGt));
      }
      if (filters.economyLt !== undefined && filters.economyLt !== '') {
        filtered = filtered.filter((p) => p.economy < parseFloat(filters.economyLt));
      }
    }

    return filtered;
  }, [roleData, searchQuery, filters, role]);

  const paginatedPlayers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPlayers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPlayers, currentPage]);

  const totalPages = Math.ceil(filteredPlayers.length / ITEMS_PER_PAGE);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
    setCurrentPage(1);
  };

  const title = `Indian T20 ${role} Stats`;
  const description = `Browse Indian T20 ${role}s with detailed statistics and performance metrics`;

  return (
    <Layout title={title} description={description}>
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2 capitalize">{title}</h1>
        <p className="text-slate-600">
          Showing {filteredPlayers.length} player{filteredPlayers.length !== 1 ? 's' : ''}
        </p>
      </section>

      <section className="mb-8">
        <label htmlFor="search" className="sr-only">
          Search {role} by name
        </label>
        <input
          id="search"
          type="text"
          placeholder={`Search ${role} by name`}
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
        />
      </section>

      <section className="mb-8 bg-slate-50 p-6 rounded-lg border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
          <button
            onClick={clearFilters}
            className="text-sm text-slate-600 hover:text-slate-900 underline"
          >
            Clear filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="matchesGt" className="block text-sm font-medium text-slate-700 mb-1">
              Matches (greater than)
            </label>
            <input
              id="matchesGt"
              type="number"
              name="matchesGt"
              value={filters.matchesGt || ''}
              onChange={handleFilterChange}
              placeholder="e.g. 50"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label htmlFor="matchesLt" className="block text-sm font-medium text-slate-700 mb-1">
              Matches (less than)
            </label>
            <input
              id="matchesLt"
              type="number"
              name="matchesLt"
              value={filters.matchesLt || ''}
              onChange={handleFilterChange}
              placeholder="e.g. 100"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          {role === 'batsman' && (
            <>
              <div>
                <label htmlFor="runsGt" className="block text-sm font-medium text-slate-700 mb-1">
                  Runs (greater than)
                </label>
                <input
                  id="runsGt"
                  type="number"
                  name="runsGt"
                  value={filters.runsGt || ''}
                  onChange={handleFilterChange}
                  placeholder="e.g. 2000"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div>
                <label htmlFor="strikeRateGt" className="block text-sm font-medium text-slate-700 mb-1">
                  Strike Rate (greater than)
                </label>
                <input
                  id="strikeRateGt"
                  type="number"
                  name="strikeRateGt"
                  value={filters.strikeRateGt || ''}
                  onChange={handleFilterChange}
                  placeholder="e.g. 130"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </>
          )}

          {role === 'bowler' && (
            <>
              <div>
                <label htmlFor="wicketsGt" className="block text-sm font-medium text-slate-700 mb-1">
                  Wickets (greater than)
                </label>
                <input
                  id="wicketsGt"
                  type="number"
                  name="wicketsGt"
                  value={filters.wicketsGt || ''}
                  onChange={handleFilterChange}
                  placeholder="e.g. 50"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div>
                <label htmlFor="economyLt" className="block text-sm font-medium text-slate-700 mb-1">
                  Economy (less than)
                </label>
                <input
                  id="economyLt"
                  type="number"
                  name="economyLt"
                  value={filters.economyLt || ''}
                  onChange={handleFilterChange}
                  placeholder="e.g. 7.5"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </>
          )}

          {role === 'allrounder' && (
            <>
              <div>
                <label htmlFor="runsGt" className="block text-sm font-medium text-slate-700 mb-1">
                  Runs (greater than)
                </label>
                <input
                  id="runsGt"
                  type="number"
                  name="runsGt"
                  value={filters.runsGt || ''}
                  onChange={handleFilterChange}
                  placeholder="e.g. 1000"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div>
                <label htmlFor="wicketsGt" className="block text-sm font-medium text-slate-700 mb-1">
                  Wickets (greater than)
                </label>
                <input
                  id="wicketsGt"
                  type="number"
                  name="wicketsGt"
                  value={filters.wicketsGt || ''}
                  onChange={handleFilterChange}
                  placeholder="e.g. 50"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div>
                <label htmlFor="strikeRateGt" className="block text-sm font-medium text-slate-700 mb-1">
                  Strike Rate (greater than)
                </label>
                <input
                  id="strikeRateGt"
                  type="number"
                  name="strikeRateGt"
                  value={filters.strikeRateGt || ''}
                  onChange={handleFilterChange}
                  placeholder="e.g. 120"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div>
                <label htmlFor="economyLt" className="block text-sm font-medium text-slate-700 mb-1">
                  Economy (less than)
                </label>
                <input
                  id="economyLt"
                  type="number"
                  name="economyLt"
                  value={filters.economyLt || ''}
                  onChange={handleFilterChange}
                  placeholder="e.g. 8"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </>
          )}
        </div>
      </section>

      {paginatedPlayers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            {paginatedPlayers.map((player) => (
              <Link key={player.slug} href={`/player/${player.slug}`} className="no-underline">
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                  <div className="relative w-full aspect-square bg-slate-100 flex-shrink-0">
                    <Image
                      src={`/images/${role}.jpg`}
                      alt={`${player.name} - ${role}`}
                      width={300}
                      height={300}
                      priority={false}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 md:p-4 flex-grow flex flex-col">
                    <h3 className="font-semibold text-slate-900 truncate text-sm md:text-base">{player.name}</h3>
                    <p className="text-xs text-slate-500 capitalize mt-1">{role}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-slate-900 text-white'
                        : 'border border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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
          <p className="text-slate-600 text-lg">No players found matching your criteria.</p>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const validRoles = ['batsman', 'bowler', 'allrounder'];

  if (!validRoles.includes(params.role)) {
    return { notFound: true };
  }

  return {
    props: {
      role: params.role,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { role: 'batsman' } },
      { params: { role: 'bowler' } },
      { params: { role: 'allrounder' } },
    ],
    fallback: false,
  };
}
