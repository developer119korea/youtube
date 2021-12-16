class Youtube {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async mostPopular() {
    const response = await this.httpClient.get('videos', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 25,
      }
    });
    return response.data.items;
  }

  async search(query) {
    const response = await this.httpClient.get('search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 25,
      }
    });
    return response.data.items.map(item => ({ ...item, id: item.id.videoId }));
  }
}

export default Youtube;