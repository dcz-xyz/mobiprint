export class MapAreaVertex {
    constructor(id) {
        this.id = id;
        this.adjacentVertexIds = new Set();
        this.color = undefined;
    }
    appendVertex(vertexId) {
        if (vertexId !== undefined) {
            this.adjacentVertexIds.add(vertexId);
        }
    }
}