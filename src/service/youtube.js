class Youtube {
  constructor(baseUrl, serviceKey) {
    this.baseUrl = baseUrl;
    this.serviceKey = serviceKey;
    this.getRequestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  }

  async mostPopular() {
    const response = await fetch(`${this.baseUrl}/videos?part=snippet&chart=mostPopular&maxResults=25&key=${this.serviceKey}`,
      this.getRequestOptions);
    const result = await response.json();
    return result.items;
  }

  async search(query) {
    const response = await fetch(`${this.baseUrl}/search?part=snippet&maxResults=25&q=${query}&type=video&key=${this.serviceKey}`,
      this.getRequestOptions);
    const result = await response.json();
    return result.items.map(item => ({ ...item, id: item.id.videoId }));
  }
}

export default Youtube;