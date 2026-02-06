/**
 * Utility Functions for T20 Cricket Stats
 * Pure JavaScript - No TypeScript
 */

/**
 * Convert string to URL-friendly slug
 */
export function createSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Format large numbers with commas
 */
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Get role-specific stats labels
 */
export function getRoleStatsLabels(role) {
  const labels = {
    batsman: ['matches', 'runs', 'average', 'strikeRate', 'highestScore'],
    bowler: ['matches', 'wickets', 'economy', 'bestBowling'],
    allrounder: ['matches', 'runs', 'wickets', 'strikeRate', 'economy'],
  };
  return labels[role] || [];
}

/**
 * Get role-specific display names
 */
export function getStatDisplayName(stat) {
  const names = {
    matches: 'Matches',
    runs: 'Runs',
    average: 'Average',
    strikeRate: 'Strike Rate',
    highestScore: 'Highest Score',
    wickets: 'Wickets',
    economy: 'Economy',
    bestBowling: 'Best Bowling',
  };
  return names[stat] || stat;
}

/**
 * Filter players by criteria
 */
export function filterPlayers(players, filters) {
  return players.filter((player) => {
    for (const [key, value] of Object.entries(filters)) {
      if (!value) continue;

      if (key === 'minMatches' && player.matches < value) return false;
      if (key === 'maxMatches' && player.matches > value) return false;
      if (key === 'minRuns' && player.runs < value) return false;
      if (key === 'maxRuns' && player.runs > value) return false;
      if (key === 'minWickets' && player.wickets < value) return false;
      if (key === 'maxWickets' && player.wickets > value) return false;
      if (key === 'minStrikeRate' && player.strikeRate < value) return false;
      if (key === 'maxEconomy' && player.economy > value) return false;
    }
    return true;
  });
}

/**
 * Sort players by specific stat
 */
export function sortPlayers(players, sortBy, sortOrder = 'desc') {
  const sorted = [...players].sort((a, b) => {
    const aValue = a[sortBy] || 0;
    const bValue = b[sortBy] || 0;

    if (typeof aValue === 'string') {
      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  return sorted;
}

/**
 * Paginate array
 */
export function paginate(array, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return array.slice(startIndex, startIndex + pageSize);
}

/**
 * Calculate total pages
 */
export function calculateTotalPages(totalItems, pageSize) {
  return Math.ceil(totalItems / pageSize);
}
