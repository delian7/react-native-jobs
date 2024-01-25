import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './nearbyjobs.style'
import { COLORS, SIZES } from '../../../constants'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import useFetch from '../../../hook/useFetch'

const NearbyJobs = () => {
  const router = useRouter()
  const { data, isLoading, error } = useFetch('search', {
    query: 'Remote Ruby on Rails Developer',
    num_pages: 1
  })

  return (
    <View style={ styles.container }>
      <View style={ styles.header }>
        <Text style={ styles.headerTitle }>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={ styles.headerBtn }>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={ styles.cardsContainer }>
        {isLoading ? (
          <ActivityIndicator size={ SIZES.large } color={ COLORS.primary } />
        ) : error ? (
          <Text>Something Went Error</Text>
        ) : (
          data.map((job) => (
            <NearbyJobCard
              key={ `nearby-job-${job?.job_id}` }
              job={ job }
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default NearbyJobs