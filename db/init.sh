export ELASTICSEARCH=http://localhost:9200

export PREFIX=lvdt

# Create indices
curl -XPUT $ELASTICSEARCH/$PREFIX-rooms

# Load data
