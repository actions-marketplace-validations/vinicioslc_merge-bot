class Config {
  constructor(core) {
    this.blocking_labels = core
      .getInput('blocking_labels')
      .split(',')
      .filter(el => {
        return el
      })
      .map(x => x.trim())

    this.labels = this.normalizeMergeLabels(core.getInput('labels'))
    this.merge_method = core.getInput('method')
    this.review_required = core.getInput('reviewers') === 'true'
    this.checks_enabled = core.getInput('checks_enabled') === 'true'
    this.test_mode = core.getInput('test') === 'true'
    this.delete_source_branch = core.getInput('delete_source_branch') === 'true'

  }

  normalizeMergeLabels(labels) {
    const rawLabel = labels?.trim()
    const isIgnoredLabels = rawLabel === 'ignore'
    const labelsList = isIgnoredLabels
      ? rawLabel
      : rawLabel
          .split(',')
          .filter(el => {
            return el
          })
          .map(x => x.trim())
    return labelsList
  }

  static hasRequiredLabels(config, receivedlabels) {
    if (config.labels === 'ignore') {
      return true
    } else if (config.labels) {
      return config.labels.every(configLabel => receivedlabels.includes(configLabel))
    }
    return false
  }
}

module.exports = Config
