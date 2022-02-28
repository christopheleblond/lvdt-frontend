export ELASTICSEARCH=http://localhost:9200

export PREFIX=lvdt

# Create indices
curl -XPUT $ELASTICSEARCH/$PREFIX-rooms
curl -XPUT $ELASTICSEARCH/$PREFIX-plays

# Load data
