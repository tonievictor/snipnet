export function formatDate(date: Date): string {
	const diff = new Date().getTime() - date.getTime();
	if (diff < 1000) {
		return "Now"
	}

	const seconds = Math.floor(diff / 1000)
	if (seconds < 60) {
		return `${seconds} sec${seconds > 1 && 's'} ago`
	}

	const minutes = Math.floor(diff / (60 * 1000))
	if (minutes < 60) {
		return `${minutes} min${minutes > 1 && 's'} ago`
	}

	const hours = Math.floor(diff / (1000 * 60 * 60))
	if (hours < 24) {
		return `${hours} hour${hours > 1 && 's'} ago`
	}

	const days = Math.floor(diff / (1000 * 60 * 60 * 24))
	return `${days} day${days > 1 && 's'} ago`
}

export function formatStrToUpperCase(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export function firstNChars(str: string, n: number): string {
	return (str.length > n) ? `${str.slice(0, n)}...` : str
}
